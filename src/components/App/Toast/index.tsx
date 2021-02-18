import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCheckBox, BsQuestionSquareFill } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { GoRadioTower } from "react-icons/go";
import { FaRegTimesCircle } from "react-icons/fa";
import AlertContainer from "./AlertContainer";
import AlertMessage from "./AlertMessage";
import AlertType from "./AlertType";
import { ReactText } from "~types";

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

const ToastMessage: IToastMessage = ({ type, message }) =>
  toast[type](
    <AlertContainer data-testid="modal-alert">
      <AlertType data-testid="modal-alert-type">{displayIcon(type)}</AlertType>
      <AlertMessage data-testid="modal-message">{message}</AlertMessage>
    </AlertContainer>
  );

export default ToastMessage;
