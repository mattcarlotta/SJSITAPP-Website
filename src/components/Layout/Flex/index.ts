import styled from "@emotion/styled";

const Flex = styled.div<{
  align?: string;
  background?: string;
  color?: string;
  direction?: string;
  flexwrap?: boolean;
  justify?: string;
  height?: string;
  padding?: string;
  margin?: string;
  width?: string;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  flex-wrap: ${({ flexwrap }) => (flexwrap ? "wrap" : "nowrap")};
  justify-content: ${({ justify }) => justify || "start"};
  padding: ${({ padding }) => padding || "0px"};
  margin: ${({ margin }) => margin || "0px"};
  height: ${({ height }) => height};
  width: ${({ width }) => width || "100%"};
  align-items: ${({ align }) => align};
  color: ${({ color }) => color};
  background: ${({ background }) => background || "transparent"};
  border-radius: 5px;
`;

export default Flex;
