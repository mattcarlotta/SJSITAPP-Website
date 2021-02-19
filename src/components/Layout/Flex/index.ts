import styled from "@emotion/styled";

const Flex = styled.div<{
  direction?: string;
  flexwrap?: boolean;
  justify?: string;
  padding?: string;
  width?: string;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  flex-wrap: ${({ flexwrap }) => (flexwrap ? "wrap" : "nowrap")};
  align-items: center;
  justify-content: ${({ justify }) => justify || "start"};
  padding: ${({ padding }) => padding || "0"};
  width: ${({ width }) => width || "100%"};
`;

export default Flex;
