import styled from "@emotion/styled";

const CalendarDateContainer = styled.div<{ height?: string }>`
  display: block;
  height: ${({ height }) => height || "252px"};
  padding: 4px 20px;
  color: rgba(0, 0, 0, 0.65);
  background-color: rgba(35, 207, 234, 0.03);
  text-align: left;
  border-top: 1px solid rgba(35, 207, 234, 0.25);
  border-bottom: 1px solid rgba(35, 207, 234, 0.25);
  border-radius: 4px;
  overflow-y: auto;
  transition: background 0.3s;
`;

export default CalendarDateContainer;
