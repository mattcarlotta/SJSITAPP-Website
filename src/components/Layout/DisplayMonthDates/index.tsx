import * as React from "react";
import { css } from "@emotion/react";
import moment from "~utils/momentWithTimezone";

export type TDisplayMonthDates = {
  startMonth?: string;
  endMonth?: string;
  margin?: string;
};

const simpleFormat = "MMM Do";

const DisplayMonthDates = ({
  endMonth,
  margin,
  startMonth
}: TDisplayMonthDates): JSX.Element => (
  <div
    css={css`
      color: #1a4448;
      margin: ${margin || "0 0 10px 0"};
    `}
  >
    {startMonth
      ? moment(startMonth).format(simpleFormat)
      : moment().add(1, "months").startOf("month").format(simpleFormat)}
    &nbsp;–&nbsp;
    {endMonth
      ? moment(endMonth).format(simpleFormat)
      : moment().add(1, "months").endOf("month").format(simpleFormat)}
  </div>
);

export default DisplayMonthDates;
