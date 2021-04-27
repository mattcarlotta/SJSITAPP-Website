import { TBaseFieldProps, TService } from "~types";
import { timestampFormat } from "~utils/dateFormats";
import moment from "~utils/momentWithTimezone";
import toOrdinal from "~utils/toOrdinal";

const Fields = (service?: TService): Array<TBaseFieldProps> => [
  {
    name: "emailOnline",
    type: "switch",
    label: "Email Service Status",
    errors: "",
    value: service ? service.emailOnline : true,
    tooltip:
      "This field determines whether or not the email services are running.",
    required: false
  },
  {
    name: "automatedOnline",
    type: "switch",
    label: "Automated Service Status",
    errors: "",
    value: service ? service.automatedOnline : true,
    tooltip:
      "This field is a master switch that overrides all of the automated services below. If this field is turned off, then all of the automated services below will not be ran.",
    required: false
  },
  {
    name: "formReminderOnline",
    type: "switch",
    label: "A/P Form Email Reminder Status (automated)",
    errors: "",
    value: service ? service.formReminderOnline : true,
    tooltip:
      "This field determines whether or not the automated service generates A/P form email reminders every month.",
    required: false
  },
  {
    name: "formReminderDay",
    type: "select",
    label: "A/P Form Email Reminder Day (automated)",
    errors: "",
    value: service ? service.formReminderDay : "5th",
    tooltip:
      "This field determines which day of the month the automated service sends A/P form email reminders. Ex: Every 5th day of each month.",
    required: true,
    selectOptions: Array.from({ length: 28 }, (_, i) => toOrdinal(i + 1))
  },
  {
    name: "formReminderTime",
    type: "time",
    label: "A/P Form Email Reminder Time (automated)",
    errors: "",
    value: service
      ? moment(service.formReminderTime, timestampFormat).format()
      : null,
    tooltip:
      "This field determines what time the automated service sends A/P form email reminders. Ex: 5:00 pm",
    required: true,
    style: { width: "100%", height: "100px" }
  },
  {
    name: "eventOnline",
    type: "switch",
    label: "Event & A/P Form Creation Status (automated)",
    errors: "",
    value: service ? service.eventOnline : true,
    tooltip:
      "This field determines whether or not the automated service generates Sharks events and A/P forms every month.",
    required: false
  },
  {
    name: "eventDay",
    type: "select",
    label: "Event & A/P Form Creation Day (automated)",
    errors: "",
    value: service ? service.eventDay : "16th",
    tooltip:
      "This field determines which day of the month the automated service creates Sharks events and A/P forms. Ex: Every 16th day of each month.",
    required: true,
    selectOptions: Array.from({ length: 28 }, (_, i) => toOrdinal(i + 1))
  },
  {
    name: "eventTime",
    type: "time",
    label: "Event & A/P Form Creation Time (automated)",
    errors: "",
    value: service ? moment(service.eventTime, timestampFormat).format() : null,
    tooltip:
      "This field determines what time the automated service creates Sharks events and A/P forms. Ex: 7:59 am",
    required: true,
    style: { width: "100%", height: "100px" }
  },
  {
    name: "scheduleOnline",
    type: "switch",
    label: "Schedule Creation Status (automated)",
    errors: "",
    value: service ? service.scheduleOnline : true,
    tooltip:
      "This field determines whether or not the automated service generates individual monthly schedule emails for staff and members every month.",
    required: false
  },
  {
    name: "scheduleDay",
    type: "select",
    label: "Schedule Creation Day (automated)",
    errors: "",
    value: service ? service.scheduleDay : "15th",
    tooltip:
      "This field determines which day of the month automated service generates monthly schedule emails for staff and members. Ex: Every 15th day of each month.",
    required: true,
    selectOptions: Array.from({ length: 28 }, (_, i) => toOrdinal(i + 1))
  },
  {
    name: "scheduleTime",
    type: "time",
    label: "Schedule Creation Time (automated)",
    errors: "",
    value: service
      ? moment(service.scheduleTime, timestampFormat).format()
      : null,
    tooltip:
      "This field determines what time automated service generates monthly schedule emails for staff and members. Ex: 6:00pm",
    required: true,
    style: { width: "100%", height: "100px" }
  }
];

export default Fields;
