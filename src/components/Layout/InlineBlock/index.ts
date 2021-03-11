import styled from "@emotion/styled";

const InlineBlock = styled.div<{ textAlign?: string }>`
  display: inline-block;
  text-align: ${({ textAlign }) => textAlign || "left"};
  width: 50%;
  font-size: 14px;
`;

export default InlineBlock;