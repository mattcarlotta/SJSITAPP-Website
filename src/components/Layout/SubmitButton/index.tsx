import React from "react";
import Button from "~components/Layout/Button";
import ButtonContainer from "~components/Layout/ButtonContainer";
import Submitting from "~components/Layout/Submitting";
import { CSSProperties } from "~types";

export interface ISubmitButtonProps {
  disabled?: boolean;
  isSubmitting: boolean;
  style?: CSSProperties;
  submitBtnStyle?: CSSProperties;
  title?: string;
}

const SubmitButton = ({
  disabled,
  isSubmitting,
  title,
  style,
  submitBtnStyle
}: ISubmitButtonProps): JSX.Element => (
  <ButtonContainer style={{ marginTop: 10, ...style }}>
    {isSubmitting ? (
      <Submitting style={{ ...submitBtnStyle }} />
    ) : (
      <Button
        tertiary
        dataTestId="submit-button"
        style={{ ...style, minHeight: 54 }}
        disabled={disabled}
        fontSize="22px"
        padding="8.5px 18px"
        type="submit"
      >
        {title}
      </Button>
    )}
  </ButtonContainer>
);

export default SubmitButton;
