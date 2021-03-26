import styled from "@emotion/styled";

const SelectionContainer = styled.div<{
  height?: string;
}>`
  display: inline-block;
  height: ${({ height }) => height || "auto"};
  width: 100%;
  outline: 0;
`;

export default SelectionContainer;
