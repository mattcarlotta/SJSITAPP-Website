import { ComputedDatum } from "@nivo/pie";
import { css } from "@emotion/react";
import { TAvailabilityData } from "~types";

export type TAvailabilityTooltip = {
  datum: ComputedDatum<TAvailabilityData>;
};

const AvailabilityTooltip = ({ datum }: TAvailabilityTooltip): JSX.Element => (
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
);

export default AvailabilityTooltip;
