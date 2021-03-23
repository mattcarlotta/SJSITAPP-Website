import styled from "@emotion/styled";

const FlexCenter = styled.div<{
  breakpoint?: boolean;
  direction?: string;
  height?: string;
  justify?: string;
  margin?: string;
}>`
  ${({ breakpoint }) =>
    breakpoint &&
    `@media (max-width: 900px) {
      flex-direction: column;
    }
  `};
  color: ${({ color }) => color || "inherit"};
  height: ${({ height }) => height || "auto"};
  flex-direction: ${({ direction }) => direction || "row"};
  margin: ${({ margin }) => margin || "0px"};
  display: flex;
  align-items: center;
  width: 100%;
  ${({ justify }) => (justify ? `justify-content: ${justify}` : undefined)};
`;

export default FlexCenter;
