import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { ResponsivePie } from "@nivo/pie";
import NoAvailability from "~components/Layout/NoAvailability";
import { CSSProperties, TAvailabilityData } from "~types";

const VALIDCOLORS = ["#2979FF", "#BBBBBB"];
const INVALIDCOLORS = ["#F04D4D", "#BBBBBB"];
const styles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  color: "#025f6d",
  textAlign: "center",
  pointerEvents: "none"
} as CSSProperties;

export type AvailabilityAvgChartProps = {
  availability: Array<TAvailabilityData>;
};

const AvailabilityAvgChart = ({
  availability
}: AvailabilityAvgChartProps): JSX.Element => {
  const availabilityPercentage = get(availability, ["value"]) || 0;

  return (
    <>
      {!isEmpty(availability) ? (
        <div
          css={css`
            height: 150px;
            width: 150px;
            margin-left: auto;
            margin-right: auto;
            position: relative;
          `}
        >
          <ResponsivePie
            colors={availabilityPercentage >= 75 ? VALIDCOLORS : INVALIDCOLORS}
            data={availability}
            innerRadius={0.8}
            startAngle={360}
            endAngle={0}
            enableRadialLabels={false}
            enableSliceLabels={false}
            tooltip={
              /* istanbul ignore next */ ({ datum }) => (
                <div
                  css={css`
                    background: #fff;
                    font-size: inherit;
                    border-radius: 2px;
                    box-shadow: rgb(0 0 0 / 25%) 0px 1px 2px;
                    padding: 5px 9px;
                  `}
                >
                  <div
                    css={css`
                      white-space: pre;
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <span
                      css={css`
                        display: block;
                        width: 12px;
                        height: 12px;
                        background: ${datum.color};
                        margin-right: 7px;
                      `}
                    />
                    <span>Availability - {datum.value}%</span>
                  </div>
                </div>
              )
            }
          />
          <div style={styles}>
            <span data-test="availability-avg">{availabilityPercentage}%</span>
            <span>Availability</span>
          </div>
        </div>
      ) : (
        <NoAvailability />
      )}
    </>
  );
};

export default AvailabilityAvgChart;
