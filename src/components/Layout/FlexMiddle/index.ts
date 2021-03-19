import styled from "@emotion/styled";

const FlexMiddle = styled.div<{ width?: string }>`
  @media (max-width: 800px) {
    display: none;
  }

  display: flex;
  justify-content: flex-middle;
  align-items: center;
  flex-direction: row;
  width: ${({ width }) => width || "100%"};
`;

export default FlexMiddle;
