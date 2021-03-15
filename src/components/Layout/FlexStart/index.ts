import styled from "@emotion/styled";

const FlexStart = styled.div<{ padding?: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${({ padding }) => padding || "0px"};
  width: 100%;
`;

export default FlexStart;
