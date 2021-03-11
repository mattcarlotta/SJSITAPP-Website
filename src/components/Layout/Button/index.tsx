/* eslint-disable react/button-has-type */
import styled from "@emotion/styled";
import { ChangeEvent, CSSProperties, ReactNode } from "~types";

export type TButtonProps = {
  className?: string;
  children: ReactNode;
  dataTestId?: string;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: (event: ChangeEvent<any>) => void;
  type: "button" | "submit" | "reset" | undefined;
};

const StyledButton = ({
  className,
  children,
  dataTestId,
  disabled,
  onClick,
  style,
  type
}: TButtonProps): JSX.Element => (
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
  alt?: boolean;
  borderRadius?: string;
  disabled?: boolean;
  display?: string;
  primary?: boolean;
  danger?: boolean;
  tertiary?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  margin?: string;
  maxWidth?: string;
  width?: string;
  padding?: string;
  fontSize?: string;
  noGlow?: boolean;
}

const Button = styled(StyledButton)<StyledButtonProps>`
  cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
  display: ${({ display }) => display || "block"};
  color: ${props => {
    if (props.primary || props.danger) return "#fff";
    if (props.alt) return "#0d6472";
    if (props.tertiary) return "#e4e3e3";
    return "#fff";
  }};
  background: ${props => {
    if (props.primary) return "#0d6472";
    if (props.danger) return "#ef512d";
    if (props.tertiary) return "#010404";
    return "transparent";
  }};
  text-transform: ${props => {
    if (props.uppercase) return "uppercase";
    if (props.lowercase) return "lowercase";
    if (props.capitalize) return "capitalize";
    return "none";
  }};
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  border-radius: ${({ borderRadius }) => borderRadius || "50px"};
  border: 2px solid
    ${props => {
      if (props.primary) return "#0d6472";
      if (props.danger) return "#ef512d";
      if (props.tertiary) return "#2e7c8a";
      return "transparent";
    }};
  width: ${({ width }) => width || "100%"};
  padding: ${({ padding }) => padding || "13px 18px"};
  font-size: ${({ fontSize }) => fontSize || "18px"};
  margin: ${({ margin }) => margin || "auto"};
  max-width: ${({ maxWidth }) => maxWidth || "auto"};
  letter-spacing: 1px;

  &:hover {
    color: ${props => {
      if (props.primary || props.danger) return "#e4e3e3";
      if (props.tertiary) return "#fff";
      return "#04515d";
    }};
    background: ${props => {
      if (props.primary) return "#006d76";
      if (props.danger) return "#e8502e";
      if (props.tertiary) return "#025f6d";
      return "transparent";
    }};
    border: 2px solid
      ${props => {
        if (props.primary) return "#006d76";
        if (props.danger) return "#e8502e";
        if (props.tertiary) return "#3794a5";
        return "transparent";
      }};
    box-shadow: ${({ noGlow, danger }) =>
      noGlow
        ? "none"
        : danger
        ? "0px 0px 14px -2px #e25d3f"
        : "0px 0px 14px -2px #14d3e2"};
  }

  &:focus {
    outline: 0;
  }
`;

export default Button;
/* eslint-enable react/button-has-type */
