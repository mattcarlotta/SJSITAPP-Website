import styled from "@emotion/styled";

const FlexEnd = styled.div<{ width?: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: ${({ width }) => width || "100%"};
`;

/*
  @media (max-width: 1350px) {
    display: block;
    text-align: center;
  }
*/

export default FlexEnd;
