import * as React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import moment from "~utils/momentWithTimezone";

export type CalendarDateTitleProps = {
  className?: string;
  eventDate?: string;
  nextWeek?: boolean;
};

const CalendarDateTitleComponent = ({
  eventDate,
  className,
  nextWeek
}: CalendarDateTitleProps): JSX.Element => {
  const dayDate = moment(eventDate || Date.now());
  const weekFromDate = moment(eventDate || Date.now()).add(7, "days");

  return (
    <div className={className}>
      <div
        css={css`
          font-size: 14px;
          color: #888;
          text-align: center;
        `}
      >
        {nextWeek ? "Today" : dayDate.format("dddd")}
        {nextWeek && (
          <>
            &nbsp;to next&nbsp;
            {weekFromDate.format("dddd")}
          </>
        )}
      </div>
      <div
        css={css`
          color: #1a4448;
        `}
      >
        {dayDate.format("MMM DD")}
        {nextWeek && (
          <>
            &nbsp;&#8211;&nbsp;
            {weekFromDate.format("MMM DD")}
          </>
        )}
      </div>
    </div>
  );
};

const CalendarDateTitle = styled(CalendarDateTitleComponent)`
  text-align: center;
  width: auto;
  padding: 0;
  background: transparent;
  margin: 10px 0;
  border-radius: 2px;
  transition: all 0.3s;
`;

export default CalendarDateTitle;
