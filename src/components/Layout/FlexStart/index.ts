import styled from "@emotion/styled";

const FlexStart = styled.div<{
  breakpoint?: boolean;
  padding?: string;
  width?: string;
}>`
  ${({ breakpoint }) =>
    breakpoint &&
    `@media (max-width: 800px) {
      width: 100%;
    }
  `};

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${({ padding }) => padding || "0px"};
  width: ${({ width }) => width || "100%"};
`;

export default FlexStart;
