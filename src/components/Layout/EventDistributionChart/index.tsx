import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import { VictoryAxis, VictoryBar, VictoryLabel, VictoryChart } from "victory";
import ReactResizeDetector from "react-resize-detector";
import NoEventDistribitionData from "~components/Layout/NoEventDistrubtionData";
import { TEventDistributionData } from "~types";
import FadeIn from "../FadeIn";

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

  return (
    <ReactResizeDetector handleWidth>
      {({ width }) =>
        !isEmpty(events) ? (
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
                duration: 300,
                onLoad: { duration: 300 }
              }}
              horizontal
              padding={{
                top: 20,
                bottom: 40,
                left: largestValue[1] + 150,
                right: 20
              }}
              domainPadding={{ x: 10 }}
              height={650}
              width={width}
            >
              <VictoryBar
                data={events}
                labels={({ datum }) => datum[key]}
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
              <VictoryAxis
                tickLabelComponent={<VictoryLabel />}
                style={{
                  axis: { stroke: "grey" },
                  ticks: { stroke: "black" },
                  tickLabels: {
                    fontSize: 14
                  }
                }}
              />
              <VictoryAxis
                dependentAxis
                label="Number of Scheduled Events"
                tickValues={Array.from(
                  { length: largestValue[0] + 2 },
                  (_, i) => i
                )}
                tickLabelComponent={<VictoryLabel />}
                style={{
                  axis: { stroke: "grey" },
                  axisLabel: { padding: 40 },
                  ticks: { stroke: "black" },
                  tickLabels: { fontSize: 14 }
                }}
              />
            </VictoryChart>
          </div>
        ) : (
          <FadeIn timing="1s">
            <NoEventDistribitionData />
          </FadeIn>
        )
      }
    </ReactResizeDetector>
  );
};

export default EventDistributionChart;
