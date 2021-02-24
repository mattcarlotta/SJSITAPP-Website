import { TBaseFieldProps } from "~types";

const Fields = (token?: string): TBaseFieldProps[] => [
  {
    name: "token",
    type: "text",
    label: "Authorization Key",
    tooltip: "The authorization key is supplied via email upon staff approval.",
    icon: "key",
    value: token || "",
    errors: "",
    disabled: !!token,
    required: true
  },
  {
    name: "email",
    type: "email",
    label: "Authorized Email",
    tooltip:
      "The authorized email field below needs to match a staff approved email.",
    icon: "mail",
    value: "",
    errors: "",
    required: true
  },
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    icon: "user",
    value: "",
    errors: "",
    required: true
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    icon: "user",
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
