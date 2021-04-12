/* istanbul ignore file */
import { EmailTransferList, TBaseFieldProps } from "~types";

const Fields = (transferList?: EmailTransferList): Array<TBaseFieldProps> => [
  {
    name: "sendTo",
    type: "transfer",
    label: "Send To",
    value: [],
    errors: "",
    required: true,
    transferList,
    tooltip:
      "Select at least one employee from the 'Available' list and move them to the 'Chosen' list."
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
    placeholder: "The message you'd wish to include in the body of an email...",
    value: "",
    errors: "",
    required: true,
    disabled: false
  }
];

export default Fields;
