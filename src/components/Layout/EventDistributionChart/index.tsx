import isEmpty from "lodash.isempty";
import { VictoryAxis, VictoryBar, VictoryLabel, VictoryChart } from "victory";
import ReactResizeDetector from "react-resize-detector";
import FadeIn from "~components/Layout/FadeIn";
import Padding from "~components/Layout/Padding";
import NoEventDistribitionData from "~components/Layout/NoEventDistrubtionData";
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
  const [largestValue, largestNameLength] = !isEmpty(events)
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
    <ReactResizeDetector handleWidth refreshMode="throttle" refreshRate={1000}>
      {({ width, targetRef }) => (
        <div ref={targetRef as RefObject<HTMLDivElement>}>
          {!isEmpty(events) ? (
            <Padding
              data-testid="event-distribution-chart"
              top="5px"
              right="15px"
              left="15px"
            >
              <VictoryChart
                animate={{
                  duration: 500,
                  easing: "bounce",
                  onLoad: { duration: 500 }
                }}
                horizontal
                padding={{
                  top: 20,
                  bottom: 60,
                  left: largestNameLength + 150,
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
                  tickValues={Array.from(
                    { length: largestValue + 1 },
                    (_, i) => i + 1
                  )}
                  tickLabelComponent={<VictoryLabel />}
                  tickFormat={t => `${parseInt(t, 10)}`}
                  style={{
                    axis: { stroke: "#ccc" },
                    axisLabel: { padding: 40 },
                    grid: {
                      stroke: "grey",
                      strokeDasharray: 4,
                      opacity: 0.25
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
            </Padding>
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
