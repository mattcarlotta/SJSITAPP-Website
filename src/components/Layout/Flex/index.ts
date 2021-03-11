import styled from "@emotion/styled";

const Flex = styled.div<{
  background?: string;
  direction?: string;
  flexwrap?: boolean;
  justify?: string;
  padding?: string;
  width?: string;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  flex-wrap: ${({ flexwrap }) => (flexwrap ? "wrap" : "nowrap")};
  justify-content: ${({ justify }) => justify || "start"};
  padding: ${({ padding }) => padding || "0"};
  width: ${({ width }) => width || "100%"};
  background: ${({ background }) => background || "transparent"};
  border-radius: 5px;
`;

export default Flex;
