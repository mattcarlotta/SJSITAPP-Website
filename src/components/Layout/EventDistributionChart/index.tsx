import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import { ResponsiveBar } from "@nivo/bar";
import NoEventDistribitionData from "~components/Layout/NoEventDistrubtionData";
import { TEventDistributionData } from "~types";

export type TEventDistributionChartProps = {
  events: Array<TEventDistributionData>;
};

export const generateTicks = (max: number): Array<number> => {
  const bottomTicks = [];
  let i = 0;
  /* eslint-disable-next-line */
  while (i < max) bottomTicks[i++] = i;
  return bottomTicks;
};

const EventDistributionChart = ({
  events
}: TEventDistributionChartProps): JSX.Element => {
  const key = "Event Count";
  const largestValue = !isEmpty(events)
    ? events.reduce((a, b) => (a > b[key] ? a : b[key]), 0)
    : 0;
  const bottomTicks = generateTicks(largestValue + 1);

  return (
    <>
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
          <ResponsiveBar
            data={events}
            layout="horizontal"
            margin={{ top: 20, right: 40, bottom: 60, left: 200 }}
            indexBy="name"
            keys={["Event Count"]}
            maxValue={largestValue + 1}
            animate
            motionStiffness={180}
            motionDamping={13}
            axisBottom={{
              tickRotation: -90,
              legend: "Number of Scheduled Events",
              legendPosition: "middle",
              legendOffset: 40,
              tickValues: bottomTicks
            }}
            labelTextColor="#fefefe"
            colors={{ scheme: "set2" }}
            theme={{
              axis: {
                legend: {
                  text: {
                    fill: "#bbb",
                    fontSize: 16
                  }
                },
                ticks: {
                  text: {
                    fill: "#888",
                    fontSize: 16
                  }
                }
              },
              grid: {
                line: {
                  stroke: "#d1d1d1",
                  strokeWidth: 2,
                  strokeDasharray: "4 4"
                }
              }
            }}
          />
        </div>
      ) : (
        <NoEventDistribitionData />
      )}
    </>
  );
};

export default EventDistributionChart;
