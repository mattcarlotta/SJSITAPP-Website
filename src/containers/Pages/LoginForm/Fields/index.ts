/* istanbul ignore file */
import { TBaseFieldProps } from "~types";

const Fields: Array<TBaseFieldProps> = [
  {
    name: "email",
    type: "text",
    label: "Email",
    icon: "mail",
    value: "",
    errors: "",
    required: true
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    icon: "lock",
    value: "",
    errors: "",
    required: true
  }
];

export default Fields;
