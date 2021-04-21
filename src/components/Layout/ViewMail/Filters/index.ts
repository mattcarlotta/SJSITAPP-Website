import { TFilters } from "~types";

const Filters: TFilters = [
  {
    name: "sendDate",
    title: "Send Date",
    type: "date"
  },
  {
    name: "status",
    title: "Email Status",
    selectType: "email",
    type: "select"
  }
];

export default Filters;
