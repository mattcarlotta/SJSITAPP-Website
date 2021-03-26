import styled from "@emotion/styled";

const SelectionContainer = styled.div<{
  disabled?: boolean;
  errors?: string;
  height?: string;
  isVisible?: boolean;
  value?: string;
}>`
  display: inline-block;
  height: ${({ height }) => height || "auto"};
  width: 100%;
  outline: 0;
`;

export default SelectionContainer;
