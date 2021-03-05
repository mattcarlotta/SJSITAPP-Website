import styled from "@emotion/styled";

const Margin = styled.span<{
  bottom?: string;
  left?: string;
  right?: string;
  top?: string;
}>`
  margin-top: ${({ top }) => top || "0px"};
  margin-bottom: ${({ bottom }) => bottom || "0px"};
  margin-right: ${({ right }) => right || "0px"};
  margin-left: ${({ left }) => left || "0px"};
  word-wrap: break-word;
`;

export default Margin;
