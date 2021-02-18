import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BsCheckBox,
  BsFillExclamationOctagonFill,
  BsFillExclamationTriangleFill,
  BsInfoSquareFill,
  BsQuestionSquareFill
} from "react-icons/bs";
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

export const displayIcon = (type: string | undefined): JSX.Element => {
  switch (type) {
    case "success":
      return <BsCheckBox />;
    case "info":
      return <BsInfoSquareFill />;
    case "error":
      return <BsFillExclamationOctagonFill />;
    case "warning":
      return <BsFillExclamationTriangleFill />;
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
