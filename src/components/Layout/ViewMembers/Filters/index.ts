import { TFilters } from "~types";

const Filters: TFilters = [
  {
    name: "status",
    title: "Account Status",
    selectType: "status",
    type: "select"
  },
  {
    name: "role",
    title: "Role",
    selectType: "role",
    type: "select"
  },
  {
    name: "email",
    title: "Email",
    type: "text"
  },
  {
    name: "firstName",
    title: "First Name",
    type: "text"
  },
  {
    name: "lastName",
    title: "Last Name",
    type: "text"
  }
];

export default Filters;
