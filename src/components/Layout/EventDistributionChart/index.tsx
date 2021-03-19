import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import { VictoryAxis, VictoryBar, VictoryLabel, VictoryChart } from "victory";
import ReactResizeDetector from "react-resize-detector";
import NoEventDistribitionData from "~components/Layout/NoEventDistrubtionData";
import FadeIn from "~components/Layout/FadeIn";
import { RefObject, TEventDistributionData } from "~types";

export type TEventDistributionChartProps = {
  events: Array<TEventDistributionData>;
};

const COLORS = [
  "#66C2A5",
  "#FC8D62",
  "#8DA0CB",
  "#E78AC3",
  "#A6D854",
  "#FFD92F"
];

const EventDistributionChart = ({
  events
}: TEventDistributionChartProps): JSX.Element => {
  const label = "name";
  const key = "Event Count";
  const largestValue = !isEmpty(events)
    ? events.reduce(
        (a, b) => {
          if (a[0] < b[key]) a[0] = b[key];
          if (a[1] < b[label].length) a[1] = b[label].length;
          return a;
        },
        [0, 0]
      )
    : [0, 0];
  const tickValues = Array.from(
    { length: largestValue[0] + 1 },
    (_, i) => i + 1
  );

  return (
    <ReactResizeDetector handleWidth refreshMode="throttle" refreshRate={1000}>
      {({ width, targetRef }) => (
        <div ref={targetRef as RefObject<HTMLDivElement>}>
          {!isEmpty(events) ? (
            <div
              data-testid="event-distribution-chart"
              css={css`
                height: 650px;
                width: 100%;
                padding-left: 18px;
                padding-right: 35px;
                background-color: #fff;
              `}
            >
              <VictoryChart
                animate={{
                  duration: 500,
                  easing: "bounce"
                }}
                horizontal
                padding={{
                  top: 20,
                  bottom: 60,
                  left: largestValue[1] + 150,
                  right: 20
                }}
                domainPadding={{ x: 15 }}
                height={650}
                width={width}
              >
                <VictoryAxis
                  tickLabelComponent={<VictoryLabel />}
                  style={{
                    axis: { stroke: "#ccc" },
                    grid: {
                      stroke: "grey",
                      strokeDasharray: 4,
                      opacity: 0.25
                    },
                    ticks: { stroke: "black", size: 5 },
                    tickLabels: {
                      fontSize: 14
                    }
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  label="Number of Scheduled Events"
                  tickValues={tickValues}
                  tickLabelComponent={<VictoryLabel />}
                  tickFormat={t => `${parseInt(t, 10)}`}
                  style={{
                    axis: { stroke: "#ccc" },
                    axisLabel: { padding: 40 },
                    grid: {
                      stroke: "grey",
                      strokeDasharray: 4,
                      opacity: 0.25,
                      zIndex: -1
                    },
                    ticks: { stroke: "black", size: 5 },
                    tickLabels: { fontSize: 14 }
                  }}
                />
                <VictoryBar
                  data={events}
                  labels={({ datum }) => parseInt(datum[key], 10)}
                  style={{
                    data: {
                      fill: ({ index }) => COLORS[(index as number) % 6]
                    },
                    labels: {
                      fill: "black"
                    }
                  }}
                  x="name"
                  y={key}
                />
              </VictoryChart>
            </div>
          ) : (
            <FadeIn timing="300ms">
              <NoEventDistribitionData />
            </FadeIn>
          )}
        </div>
      )}
    </ReactResizeDetector>
  );
};

export default EventDistributionChart;
