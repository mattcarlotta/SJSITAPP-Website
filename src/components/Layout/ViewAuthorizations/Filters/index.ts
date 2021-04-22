import { TFilters } from "~types";

const Filters: TFilters = [
  {
    name: "email",
    title: "Status",
    selectType: "registration",
    type: "select"
  },
  {
    name: "authorizedEmail",
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
