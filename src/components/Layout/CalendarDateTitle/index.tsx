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
}: CalendarDateTitleProps): JSX.Element => (
  <div className={className}>
    {!nextWeek && <div>{moment(eventDate || Date.now()).format("dddd")}</div>}
    <div>
      {moment(eventDate || Date.now()).format("MMM DD")}
      {nextWeek && (
        <>
          &nbsp;&#8211;&nbsp;
          {moment(eventDate || Date.now())
            .add(7, "days")
            .format("MMM DD")}
        </>
      )}
    </div>
  </div>
);

const CalendarDateTitle = styled(CalendarDateTitleComponent)`
  text-align: center;
  width: auto;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  background: transparent;
  padding: 0 5px;
  border-radius: 2px;
  transition: all 0.3s;
`;

export default CalendarDateTitle;
