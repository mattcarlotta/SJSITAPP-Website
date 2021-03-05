import styled from "@emotion/styled";

const Padding = styled.div<{
  bottom?: string;
  left?: string;
  right?: string;
  top?: string;
}>`
  padding-top: ${({ top }) => top || "0px"};
  padding-bottom: ${({ bottom }) => bottom || "0px"};
  padding-right: ${({ right }) => right || "0px"};
  padding-left: ${({ left }) => left || "0px"};
  word-wrap: break-word;
`;

export default Padding;
