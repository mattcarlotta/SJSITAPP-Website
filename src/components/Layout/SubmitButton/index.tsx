import React from "react";
import Button from "~components/Layout/Button";
import ButtonContainer from "~components/Layout/ButtonContainer";
import Submitting from "~components/Layout/Submitting";
import { CSSProperties, ReactElement } from "~types";

export interface ISubmitButtonProps {
  disabled?: boolean;
  maxWidth: string;
  isSubmitting: boolean;
  style?: CSSProperties;
  submitBtnStyle?: CSSProperties;
  title?: string;
}

const SubmitButton = ({
  disabled,
  isSubmitting,
  maxWidth,
  title,
  style,
  submitBtnStyle
}: ISubmitButtonProps): ReactElement => (
  <ButtonContainer maxWidth={maxWidth} style={style}>
    {isSubmitting ? (
      <Submitting style={{ ...submitBtnStyle }} />
    ) : (
      <Button
        tertiary
        dataTestId="submit-button"
        margin="0 auto"
        disabled={disabled}
        fontSize="22px"
        padding="8.5px 18px"
        type="submit"
        maxWidth={maxWidth}
        style={style}
      >
        {title}
      </Button>
    )}
  </ButtonContainer>
);

export default SubmitButton;
