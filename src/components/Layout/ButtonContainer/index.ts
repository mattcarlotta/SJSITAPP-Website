import styled from "@emotion/styled";

export interface ButtonContainerProps {
  primary?: boolean;
  danger?: boolean;
  tertiary?: boolean;
}

const ButtonContainer = styled.div<ButtonContainerProps>`
  width: 100%;
  border-radius: 4px;
  background: ${props => {
    if (props.primary)
      return "linear-gradient(90deg,#194048 0%,#0f7888 50%,#194048 100%)";
    if (props.danger)
      return "linear-gradient(90deg,#8a4133 0%,#f56342 50%,#8a4133 100%)";
    if (props.tertiary)
      return "linear-gradient(90deg,#12454e 0%,rgb(16,116,131) 50%,#12454e 100%)";
    return "transparent";
  }};
`;

export default ButtonContainer;
