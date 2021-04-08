import isEmpty from "lodash.isempty";
import { TBaseFieldProps, TForm } from "~types";

const Fields = (
  seasondIds?: Array<string>,
  form?: TForm
): Array<TBaseFieldProps> => [
  {
    name: "seasonId",
    type: "select",
    label: "Season ID",
    placeholder: "Select a season id...",
    errors: "",
    value: form ? form.seasonId : "",
    required: true,
    selectOptions: !isEmpty(seasondIds) ? seasondIds : [],
    style: { textAlign: "center" }
  },
  {
    type: "date",
    name: "startMonth",
    label: "Start Month",
    value: form ? form.startMonth : null,
    errors: "",
    required: true,
    emptyLabel: "Click to select a season start date...",
    style: { width: "100%", height: "100px" }
  },
  {
    type: "date",
    name: "endMonth",
    label: "End Month",
    value: form ? form.endMonth : null,
    errors: "",
    required: true,
    emptyLabel: "Click to select a season end date...",
    style: { width: "100%", height: "100px" }
  },
  {
    type: "date",
    name: "expirationDate",
    label: "Expiration Date",
    value: form ? form.expirationDate : null,
    errors: "",
    required: true,
    emptyLabel: "Click to select an expiration date...",
    tooltip:
      "After the date specified below, employee responses will no longer be accepted nor editable.",
    style: { width: "100%", height: "100px" }
  },
  {
    type: "date",
    name: "sendEmailNotificationsDate",
    label: "Send Email Notifications",
    value: form ? form.sendEmailNotificationsDate : null,
    errors: "",
    required: false,
    emptyLabel: "(Optional) Click to select an email notification date...",
    tooltip:
      "Specify a date to send out email notifications. If left empty, emails will be sent out immediately.",
    style: { width: "100%", height: "100px" }
  },
  {
    type: "textarea",
    name: "notes",
    label: "Notes",
    value: form ? form.notes : "",
    errors: "",
    required: false,
    placeholder:
      "(Optional) Include any special notes to add to the AP form...",
    style: { width: "100%", height: "100px" }
  }
];

export default Fields;
