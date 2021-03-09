import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { ResponsivePie } from "@nivo/pie";
import AvailabilityChartLabel from "~components/Layout/AvailabilityChartLabel";
import NoAvailability from "~components/Layout/NoAvailability";
import AvailabilityTooltip from "./Tooltip";
import { TAvailabilityData } from "~types";

const VALIDCOLORS = ["#2979ff", "#bbb"];
const INVALIDCOLORS = ["#f04d4d", "#bbb"];

export type AvailabilityAvgChartProps = {
  availability: Array<TAvailabilityData>;
};

const AvailabilityAvgChart = ({
  availability
}: AvailabilityAvgChartProps): JSX.Element => {
  const availabilityPercentage = get(availability[0], ["value"]) || 0;

  return (
    <>
      {!isEmpty(availability) ? (
        <div
          data-testid="availability-chart"
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
            tooltip={AvailabilityTooltip}
          />
          <AvailabilityChartLabel>
            <span data-test="availability-avg">{availabilityPercentage}%</span>
            <span>Availability</span>
          </AvailabilityChartLabel>
        </div>
      ) : (
        <NoAvailability />
      )}
    </>
  );
};

export default AvailabilityAvgChart;
