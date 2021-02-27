import styled from "@emotion/styled";

const CalendarDateContainer = styled.div<{ height?: string }>`
  display: block;
  height: ${({ height }) => height || "252px"};
  padding: 5px 15px;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  text-align: left;
  border-radius: 5px;
  overflow-y: auto;
  transition: background 0.3s;
`;

// background-color: rgba(35, 207, 234, 0.03);
// border-top: 1px solid rgba(35, 207, 234, 0.25);
// border-bottom: 1px solid rgba(35, 207, 234, 0.25);

export default CalendarDateContainer;
