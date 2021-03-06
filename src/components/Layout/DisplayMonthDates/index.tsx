import * as React from "react";
import moment from "~utils/momentWithTimezone";

export type TDisplayMonthDates = {
  startMonth?: string;
  endMonth?: string;
};

const simpleFormat = "MMM Do";

const DisplayMonthDates = ({
  startMonth,
  endMonth
}: TDisplayMonthDates): JSX.Element => (
  <>
    {startMonth
      ? moment(startMonth).format(simpleFormat)
      : moment().add(1, "months").startOf("month").format()}
    &nbsp;–&nbsp;
    {endMonth
      ? moment(endMonth).format(simpleFormat)
      : moment().add(1, "months").endOf("month").format()}
  </>
);

export default DisplayMonthDates;
