/* istanbul ignore file */
import { TBaseFieldProps } from "~types";

export type TFieldsProps = {
  id: string;
  avatar: string;
  email: string;
  emailReminders: boolean;
  firstName: string;
  lastName: string;
  role: string;
};

const Fields = (props: TFieldsProps): Array<TBaseFieldProps> =>
  [
    {
      name: "emailReminders",
      type: "switch",
      label: "Email Reminders",
      value: props.emailReminders,
      tooltip:
        "This setting only affects scheduled events and A/P form email reminders. Monthly schedules will remain unaffected.",
      required: false
    },
    props.role !== "employee" && {
      name: "role",
      type: "select",
      label: "Role",
      placeholder: "Select an option...",
      icon: "usertag",
      value: props.role,
      errors: "",
      required: true,
      selectOptions: ["staff", "employee"]
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      icon: "mail",
      value: props.email,
      errors: "",
      required: true
    },
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      icon: "user",
      value: props.firstName,
      errors: "",
      required: true
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      icon: "user",
      value: props.lastName,
      errors: "",
      required: true
    }
  ].filter(Boolean) as Array<TBaseFieldProps>;

export default Fields;