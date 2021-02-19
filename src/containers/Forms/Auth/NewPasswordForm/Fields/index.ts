/* istanbul ignore file */
import { TBaseFieldProps } from "~types";

const Fields: TBaseFieldProps[] = [
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
