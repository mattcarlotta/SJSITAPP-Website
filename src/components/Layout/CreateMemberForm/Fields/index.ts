import { TBaseFieldProps } from "~types";

const Fields: Array<TBaseFieldProps> = [
  {
    name: "role",
    type: "select",
    label: "Role",
    placeholder: "Select a role...",
    value: "Member",
    errors: "",
    required: true,
    selectOptions: ["Member", "Staff"]
  },
  {
    name: "authorizedEmail",
    type: "email",
    label: "Authorized Email",
    tooltip:
      "The email provided below will be used to authenticate new memberships. Please make sure it is valid.",
    placeholder: "Enter an email to authorize...",
    value: "",
    errors: "",
    required: true
  }
];

export default Fields;
