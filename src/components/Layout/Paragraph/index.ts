import styled from "@emotion/styled";

const Paragraph = styled.div<{ marginBottom?: string; marginTop?: string }>`
  margin-top: ${({ marginTop }) => marginTop || "5px"};
  margin-bottom: ${({ marginBottom }) => marginBottom || "30px"};
  word-wrap: normal;
  white-space: pre-wrap;
  letter-spacing: 1px;
  line-height: 40px;
  width: 100%;
`;

export default Paragraph;
