import * as React from "react";
import styled from "@emotion/styled";
import Label from "~components/Forms/Label";
import Errors from "~components/Forms/Errors";
import Icon from "~components/Layout/Icon";
import ClickHandler from "./ClickHandler";
import { ChangeEvent, CSSProperties, TIconType, TInputType } from "~types";

export interface IInputComponentProps {
  className?: string;
  containerStyle?: CSSProperties;
  errors?: string;
  disabled?: boolean;
  icon?: TIconType;
  inputStyle?: CSSProperties;
  label?: string;
  name: string;
  onChange: (e: ChangeEvent<any>) => void;
  placeholder?: string;
  readOnly?: boolean;
  type: TInputType;
  tooltip?: string;
  value: string;
}

const InputComponent = ({
  className,
  containerStyle,
  errors,
  disabled,
  icon,
  inputStyle,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  type,
  tooltip,
  value
}: IInputComponentProps): JSX.Element => (
  <div className={className} style={containerStyle}>
    <ClickHandler>
      {({ isFocused, handleBlur, handleFocus }) => (
        <div
          className={[
            isFocused && "focused",
            errors && "error",
            disabled && "disabled-input"
          ]
            .filter(c => !!c)
            .join(" ")}
        >
          {label && <Label name={name} label={label} tooltip={tooltip} />}
          <div style={{ display: "flex", alignItems: "center" }}>
            {icon && <Icon dataTestId={name} type={icon} />}
            <input
              aria-label={name}
              tabIndex={0}
              type={type}
              name={name}
              onBlur={handleBlur}
              onChange={onChange}
              onFocus={handleFocus}
              placeholder={placeholder}
              value={value}
              style={inputStyle}
              disabled={disabled}
              readOnly={readOnly}
            />
          </div>
          {errors && <Errors data-testid="errors">{errors}</Errors>}
        </div>
      )}
    </ClickHandler>
  </div>
);

const Input = styled(InputComponent)`
  position: relative;
  display: inline-block;
  height: 87px;
  width: 100%;

  input {
    position: relative;
    padding: ${({ icon }) => `10px 0 10px ${icon ? 48 : 17}px`};
    width: 100%;
    font-size: 16px;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    transition: border 0.2s ease-in-out;

    &:hover {
      border: 1px solid #bfbebe;
    }

    &::placeholder {
      color: #d3dce6;
    }

    &:focus {
      outline: 0;
    }
  }

  .focused {
    svg {
      color: #1e90ff;
    }

    input {
      border: 1px solid #1e90ff;
    }
  }

  .error {
    svg {
      color: #d14023 !important;
    }

    input {
      border: 1px solid #d14023 !important;
    }
  }

  .disabled-input {
    & .icon > svg {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.25);
    }

    input {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.25);
      background: #f5f5f5;
      border: 1px solid #e6d8d8;

      &:hover {
        border: 1px solid #e6d8d8;
      }
    }
  }
`;

export default Input;
