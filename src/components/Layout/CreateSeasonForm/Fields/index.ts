import { TBaseFieldProps } from "~types";

const Fields: Array<TBaseFieldProps> = [
  {
    type: "date",
    name: "startDate",
    label: "Start Date",
    value: null,
    errors: "",
    required: true,
    emptyLabel: "Click to select a season start date...",
    style: { width: "100%", height: "100px" }
  },
  {
    type: "date",
    name: "endDate",
    label: "End Date",
    value: null,
    errors: "",
    required: true,
    emptyLabel: "Click to select a season end date...",
    style: { width: "100%", height: "100px" }
  }
];

export default Fields;
