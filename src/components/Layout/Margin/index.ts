import styled from "@emotion/styled";

const Margin = styled.span<{
  bottom?: string;
  left?: string;
  right?: string;
  top?: string;
}>`
  margin-top: ${({ top }) => top || "0x"};
  margin-bottom: ${({ bottom }) => bottom || "0x"};
  margin-right: ${({ right }) => right || "0x"};
  margin-left: ${({ left }) => left || "0x"};
  word-wrap: break-word;
`;

export default Margin;
