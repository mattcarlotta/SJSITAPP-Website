import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import { ResponsiveBar } from "@nivo/bar";
import NoEventDistribitionData from "~components/Layout/NoEventDistrubtionData";
import { TEventDistributionData } from "~types";

export type TEventDistributionChartProps = {
  events: Array<TEventDistributionData>;
};

const EventDistributionChart = ({
  events
}: TEventDistributionChartProps): JSX.Element => (
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
          margin={{ top: 60, right: 40, bottom: 250, left: 80 }}
          indexBy="name"
          keys={["Event Count"]}
          animate
          motionStiffness={180}
          motionDamping={13}
          axisLeft={{
            legend: "Number of Events",
            legendPosition: "middle",
            legendOffset: -70,
            tickValues: 2
          }}
          axisBottom={{
            tickRotation: -90,
            legend: "Employee Name",
            legendPosition: "middle",
            legendOffset: 220
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

export default EventDistributionChart;
