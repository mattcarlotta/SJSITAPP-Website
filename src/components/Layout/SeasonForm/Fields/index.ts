import { TBaseFieldProps, TSeasonData } from "~types";

const Fields = (season?: TSeasonData): Array<TBaseFieldProps> => [
  {
    type: "date",
    name: "startDate",
    label: "Start Date",
    value: season ? season.startDate : null,
    errors: "",
    required: true,
    emptyLabel: "Click to select a season start date...",
    style: { width: "100%", height: "100px" }
  },
  {
    type: "date",
    name: "endDate",
    label: "End Date",
    value: season ? season.endDate : null,
    errors: "",
    required: true,
    emptyLabel: "Click to select a season end date...",
    style: { width: "100%", height: "100px" }
  }
];

export default Fields;
