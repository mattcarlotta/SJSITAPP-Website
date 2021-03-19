import styled from "@emotion/styled";

const FlexEnd = styled.div<{ breakpoint?: boolean; width?: string }>`
  ${({ breakpoint }) =>
    breakpoint &&
    `@media (max-width: 800px) {
      width: auto;
    }
  `};

  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: ${({ width }) => width || "100%"};
`;

export default FlexEnd;
