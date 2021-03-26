import styled from "@emotion/styled";

const Container = styled.div<{
  display?: string;
  height?: string;
  maxWidth?: string;
  margin?: string;
  width?: string;
}>`
  display: ${({ display }) => display};
  height: ${({ height }) => height || "90px"};
  max-width: ${({ maxWidth }) => maxWidth};
  width: ${({ width }) => width || "100%"};
  margin: ${({ margin }) => margin};
`;

export default Container;
