import * as React from "react";
import { css } from "@emotion/react";
import isEmpty from "lodash.isempty";
import { VictoryPie } from "victory";
import AvailabilityChartLabel from "~components/Layout/AvailabilityChartLabel";
import NoAvailability from "~components/Layout/NoAvailability";
import { CSSProperties, TEventResponseCount } from "~types";

export type TAvailabilityResponseChartProps = {
  availability: Array<TEventResponseCount>;
  style?: CSSProperties;
};

const AvailabilityResponseChart = ({
  availability,
  style
}: TAvailabilityResponseChartProps): JSX.Element => (
  <>
    {!isEmpty(availability) ? (
      <div
        data-testid="availability-response-chart"
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
          colorScale={["#247BA0", "#2A9D8F", "#F4A261", "#FF8060", "#BFBFBF"]}
        />
        <AvailabilityChartLabel>
          <div data-testid="availability-avg">Event</div>
          <div>Response</div>
          <div>Distribution</div>
        </AvailabilityChartLabel>
      </div>
    ) : (
      <NoAvailability />
    )}
  </>
);

export default AvailabilityResponseChart;
