import * as React from "react";
import { css } from "@emotion/react";
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { VictoryAxis, VictoryChart, VictoryBar, VictoryLabel } from "victory";
import NoAvailability from "~components/Layout/NoAvailability";
import { CSSProperties, TEventScheduledEvents } from "~types";

export type TAvailabilityResponseChartProps = {
  events: Array<TEventScheduledEvents>;
  style?: CSSProperties;
};

const COLORS = ["#66C2A5", "#FC8D62"];

const EventScheduleChart = ({
  events,
  style
}: TAvailabilityResponseChartProps): JSX.Element => {
  const largestValue = !isEmpty(events) ? get(events[1], "events") : 0;

  return (
    <>
      {!isEmpty(events) ? (
        <div
          data-testid="event-schedule-chart"
          style={style}
          css={css`
            margin: 0 auto;
            max-width: 700px;
          `}
        >
          <VictoryChart
            animate={{
              duration: 500,
              easing: "bounce",
              onLoad: { duration: 500 }
            }}
            domainPadding={{ x: 100 }}
            padding={{
              top: 30,
              bottom: 60,
              left: 60,
              right: 20
            }}
          >
            <VictoryAxis
              label="Events"
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
                  fontSize: 12
                }
              }}
            />
            <VictoryAxis
              dependentAxis
              tickLabelComponent={<VictoryLabel />}
              tickFormat={t => `${parseInt(t, 10)}`}
              tickValues={Array.from(
                { length: largestValue + 1 },
                (_, i) => i + 1
              )}
              style={{
                axis: { stroke: "transparent" },
                axisLabel: { padding: 40 },
                grid: {
                  stroke: "grey",
                  strokeDasharray: 4,
                  opacity: 0.25
                },
                ticks: { stroke: "black", size: 5 },
                tickLabels: { fontSize: 12 }
              }}
            />
            <VictoryBar
              x="id"
              y="events"
              style={{
                data: {
                  fill: ({ index }) => COLORS[index as number]
                },
                labels: { fill: "white" }
              }}
              data={events}
              labels={({ datum }) => datum.events}
            />
          </VictoryChart>
        </div>
      ) : (
        <NoAvailability />
      )}
    </>
  );
};

export default EventScheduleChart;
