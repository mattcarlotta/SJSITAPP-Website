import styled from "@emotion/styled";

const SelectionContainer = styled.div<{
  disabled?: boolean;
  errors?: string;
  height?: string;
  isVisible?: boolean;
  value?: string;
}>`
  cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
  background-color: ${({ disabled }) => (!disabled ? "#fff" : "#ebebeb")};
  display: inline-block;
  height: ${({ height }) => height || "auto"};
  width: 100%;
  border-radius: 4px;
  border: 1px solid
    ${({ errors, isVisible, value }) => {
      if (errors && !value) return "#d14023 !important";
      if (isVisible) return "#1e90ff";
      return "#ccc";
    }};
  transition: all 0.3s ease-in-out;

  svg {
    color: ${({ errors, isVisible, value }) => {
      if (errors && !value) return "#d14023";
      if (isVisible) return "#1e90ff";
      return "#d3dce6";
    }};
  }

  &:hover {
    border: 1px solid
      ${({ disabled, isVisible }) => {
        if (disabled) return "#e5e5e5";
        if (isVisible) return "#1e90ff";
        return "#bfbebe";
      }};
  }

  &:focus {
    border: 1px solid ${({ disabled }) => (!disabled ? "#1e90ff" : "#e5e5e5")};
    outline: 0;
  }
`;

export default SelectionContainer;
