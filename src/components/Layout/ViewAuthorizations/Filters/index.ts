import { TFilters } from "~types";

const Filters: TFilters = [
  {
    name: "email",
    title: "Registration Status",
    selectType: "registration",
    type: "select"
  },
  {
    name: "email",
    title: "Email",
    type: "text"
  },
  {
    name: "role",
    title: "Role",
    selectType: "role",
    type: "select"
  }
];

export default Filters;
