import styled from "@emotion/styled";

const Line = styled.div<{ centered?: boolean; width?: string }>`
  display: block;
  clear: both;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  padding: 0;
  height: 1px;
  width: ${({ width }) => width || "100%"};
  background-color: #e8e8e8;
  ${({ centered }) => centered && "margin: 0 auto"};
`;

export default Line;
