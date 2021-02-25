/* istanbul ignore file */
import styled from "@emotion/styled";
import Flex from "~components/Layout/Flex";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import moment from "~utils/momentWithTimezone";

export type CalendarDateTitleProps = {
  className?: string;
  eventDate?: string;
};

const CalendarDateTitleComponent = ({
  eventDate,
  className
}: CalendarDateTitleProps): JSX.Element => (
  <Flex>
    <FlexStart>
      <div className={className} style={{ textAlign: "left" }}>
        {moment(eventDate || Date.now()).format("dddd")}
      </div>
    </FlexStart>
    <FlexEnd>
      <div className={className}>
        {moment(eventDate || Date.now()).format("MMM DD")}
      </div>
    </FlexEnd>
  </Flex>
);

const CalendarDateTitle = styled(CalendarDateTitleComponent)`
  text-align: right;
  width: auto;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  transition: all 0.3s;
`;

export default CalendarDateTitle;
