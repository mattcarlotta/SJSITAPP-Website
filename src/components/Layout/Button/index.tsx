/* eslint-disable react/button-has-type */
import * as React from "react";
import styled from "@emotion/styled";
import { ComponentProps } from "~types";

export interface ButtonProps extends ComponentProps {
  disabled?: boolean;
  danger?: boolean;
  type: "button" | "submit" | "reset" | undefined;
}

const StyledButton = ({
  className,
  children,
  dataTestId,
  disabled,
  onClick,
  style,
  type
}: ButtonProps): JSX.Element => (
  <button
    data-testid={dataTestId}
    disabled={disabled}
    type={type}
    className={className}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

export interface StyledButtonProps {
  disabled?: boolean;
  display?: string;
  primary?: boolean;
  danger?: boolean;
  tertiary?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  marginRight?: string;
  width?: string;
  padding?: string;
  fontSize?: string;
}

const Button = styled(StyledButton)<StyledButtonProps>`
  cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
  display: ${({ display }) => display || "block"};
  color: ${props => {
    if (props.primary || props.danger) return "#025f6d";
    if (props.tertiary) return "#3794a5";
    return "#fff";
  }};
  background: ${props => {
    if (props.primary)
      return "linear-gradient(90deg,#194048 0%,#0f7888 50%,#194048 100%)";
    if (props.danger)
      return "linear-gradient(90deg,#8a4133 0%,#f56342 50%,#8a4133 100%)";
    if (props.tertiary) return "transparent";
    return "transparent";
  }};
  text-transform: ${props => {
    if (props.uppercase) return "uppercase";
    if (props.lowercase) return "lowercase";
    if (props.capitalize) return "capitalize";
    return "none";
  }};
  text-shadow: 1px 2px 2px #000000;
  text-decoration: none;
  margin-right: ${({ marginRight }) => marginRight || "20px"};
  transition: color 0.2s ease-in-out, background 0.2s ease-in-out,
    border 0.2s ease-in-out;
  border-radius: 4px;
  border: 2px solid
    ${props => {
      if (props.primary) return "#04515d";
      if (props.danger) return "#d24b2e";
      if (props.tertiary) return "#2e7c8a";
      return "transparent";
    }};
  width: ${({ width }) => width || "100%"};
  padding: ${({ padding }) => padding || "13px 18px"};
  font-size: ${({ fontSize }) => fontSize || "18px"};
  letter-spacing: 1px;

  &:hover {
    color: ${props => {
      if (props.primary || props.danger || props.tertiary) return "#e4e3e3";
      return "#04515d";
    }};
    border: 2px solid
      ${props => {
        if (props.primary) return "#025f6d";
        if (props.danger) return "#f56342";
        if (props.tertiary) return "#3794a5";
        return "transparent";
      }};
  }

  &:focus {
    outline: 0;
  }
`;

export default Button;
/* eslint-enable react/button-has-type */
