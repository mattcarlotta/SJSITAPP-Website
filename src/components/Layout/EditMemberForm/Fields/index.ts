/* istanbul ignore file */
import { TBaseFieldProps } from "~types";

export type TFieldsProps = {
  id: string;
  avatar: string;
  editRole?: boolean;
  email: string;
  emailReminders: boolean;
  firstName: string;
  lastName: string;
  role: string;
};

const Fields = (props: TFieldsProps): Array<TBaseFieldProps> =>
  [
    props.editRole && {
      name: "role",
      type: "select",
      label: "Role",
      placeholder: "Select an option...",
      icon: "usertag",
      value: props.role,
      errors: "",
      required: true,
      selectOptions: ["staff", "member"]
    },
    {
      name: "emailReminders",
      type: "switch",
      label: "Email Reminders",
      value: props.emailReminders,
      tooltip:
        "This setting only affects scheduled event and A/P form email reminders. The monthly schedule email will remain unaffected.",
      required: false
    },
    {
      name: "email",
      type: "email",
      label: "Account Email",
      icon: "mail",
      tooltip:
        "Changing your account email will log you out of your current session.",
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
