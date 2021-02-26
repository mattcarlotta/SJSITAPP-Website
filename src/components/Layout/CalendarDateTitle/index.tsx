import * as React from "react";
import styled from "@emotion/styled";
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
      <div>
        {dayDate.format("dddd")}
        {nextWeek && (
          <>
            &nbsp;&#8211;&nbsp;
            {weekFromDate.format("dddd")}
          </>
        )}
      </div>
      <div>
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
  color: rgba(0, 0, 0, 0.65);
  background: transparent;
  padding: 0 5px;
  margin-bottom: 10px;
  border-radius: 2px;
  transition: all 0.3s;
`;

export default CalendarDateTitle;
