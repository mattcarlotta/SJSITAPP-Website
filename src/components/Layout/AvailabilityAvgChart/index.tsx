import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import { VictoryPie } from "victory";
import AvailabilityChartLabel from "~components/Layout/AvailabilityChartLabel";
import NoAvailability from "~components/Layout/NoAvailability";
import { CSSProperties, ReactElement, TAvailabilityData } from "~types";

const VALIDCOLORS = ["#0d6472", "#bbb"];
const INVALIDCOLORS = ["#f04d4d", "#bbb"];

export type AvailabilityAvgChartProps = {
  availability: Array<TAvailabilityData>;
  style?: CSSProperties;
};

const AvailabilityAvgChart = ({
  availability,
  style
}: AvailabilityAvgChartProps): ReactElement => {
  const availabilityPercentage = get(availability[0], ["value"]) || 0;

  return (
    <>
      {!isEmpty(availability) ? (
        <div
          data-testid="availability-chart"
          style={style}
          css={css`
            height: 190px;
            position: relative;
          `}
        >
          <VictoryPie
            animate
            x="id"
            y="value"
            padding={{ top: 0, bottom: 40 }}
            innerRadius={140}
            data={availability}
            labels={/* istanbul ignore next */ () => null}
            colorScale={
              availabilityPercentage >= 75 ? VALIDCOLORS : INVALIDCOLORS
            }
          />
          <AvailabilityChartLabel>
            <span data-testid="availability-avg">
              {availabilityPercentage}%
            </span>
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
