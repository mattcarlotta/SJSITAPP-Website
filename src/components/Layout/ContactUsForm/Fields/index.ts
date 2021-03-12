/* istanbul ignore file */
import { TBaseFieldProps } from "~types";

const Fields: Array<TBaseFieldProps> = [
  {
    name: "sendTo",
    type: "select",
    label: "Send To",
    placeholder: "Select an option to send a message to...",
    value: "",
    errors: "",
    required: true,
    disabled: false,
    selectOptions: ["Admin", "Staff"]
  },
  {
    name: "subject",
    type: "text",
    label: "Subject",
    placeholder: "The subject of your message...",
    value: "",
    errors: "",
    required: true,
    disabled: false
  },
  {
    name: "message",
    type: "textarea",
    label: "Message",
    placeholder: "The reason why you're contacting us...",
    value: "",
    errors: "",
    required: true,
    disabled: false
  }
];

export default Fields;
