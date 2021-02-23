import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BsCheckBox,
  BsQuestionSquareFill,
  FaRegTimesCircle,
  FiPaperclip,
  GoRadioTower
} from "~icons";
import AlertContainer from "./AlertContainer";
import AlertMessage from "./AlertMessage";
import AlertType from "./AlertType";
import { FC, ReactText } from "~types";

export interface IToastProps {
  type: "success" | "info" | "error" | "warning";
  message: string;
}

export interface IToastMessage {
  ({ type, message }: IToastProps): ReactText;
}

export const displayIcon = (type?: string): JSX.Element => {
  switch (type) {
    case "success":
      return <BsCheckBox />;
    case "info":
      return <FiPaperclip />;
    case "error":
      return <FaRegTimesCircle />;
    case "warning":
      return <GoRadioTower />;
    default:
      return <BsQuestionSquareFill />;
  }
};

const ToastMessage: FC<IToastProps> = ({ type, message }) => {
  toast[type](
    <AlertContainer data-testid="modal-alert">
      <AlertType data-testid="modal-alert-type">{displayIcon(type)}</AlertType>
      <AlertMessage data-testid="modal-message">{message}</AlertMessage>
    </AlertContainer>
  );

  return null;
};

export default ToastMessage;
