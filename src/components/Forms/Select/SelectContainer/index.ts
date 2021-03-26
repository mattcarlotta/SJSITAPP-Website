import styled from "@emotion/styled";

const SelectContainer = styled.div<{
  errors?: string;
  background?: string;
  disabled?: boolean;
  hoverable?: boolean;
  isVisible?: boolean;
  value?: string;
}>`
  cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
  display: flex;
  margin: 0 auto;
  width: 100%;
  position: relative;
  flex-direction: row;
  transition: all 200ms ease-in-out;
  border-radius: 5px;
  border: 1px solid
    ${({ errors, isVisible, value }) => {
      if (errors && !value) return "#d14023 !important";
      if (isVisible) return "#1e90ff";
      return "#ccc";
    }};
  background: ${({ isVisible, background, disabled }) => {
    if (isVisible) return "#fff";
    if (disabled) return "#ebebeb";
    if (background) return background;
    return "#fff";
  }};
  transition: all 0.3s ease-in-out;
  outline: 0;
  ${({ disabled, isVisible, hoverable }) =>
    isVisible &&
    hoverable &&
    !disabled &&
    "background: #fff;box-shadow: 0px 0px 14px -2px #a1cdf9;border-color: #1e90ff"};

  svg {
    color: ${({ disabled, errors, isVisible, value }) => {
      if (disabled) return "#ebebeb";
      if (errors && !value) return "#d14023";
      if (isVisible) return "#1e90ff";
      return "#d3dce6";
    }};
  }

  :hover {
    ${({ disabled, hoverable }) =>
      hoverable &&
      !disabled &&
      "background: #fff;box-shadow: 0px 0px 14px -2px #a1cdf9;border-color: #1e90ff"};
    border: 1px solid
      ${({ disabled, isVisible }) => {
        if (disabled) return "#e5e5e5";
        if (isVisible) return "#1e90ff";
        return "#bfbebe";
      }};
  }

  :focus {
    border: 1px solid ${({ disabled }) => (!disabled ? "#1e90ff" : "#e5e5e5")};
    outline: 0;
  }
`;

export default SelectContainer;
