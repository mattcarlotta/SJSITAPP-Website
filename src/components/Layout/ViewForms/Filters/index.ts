import { TFilters } from "~types";

const Filters: TFilters = [
  {
    name: "seasonId",
    title: "Season Id",
    type: "text"
  },
  {
    name: "startMonth",
    title: "Start Month",
    type: "date"
  },
  {
    name: "endMonth",
    title: "End Month",
    type: "date"
  },
  {
    name: "expirationDate",
    title: "Expiration Date",
    type: "date"
  },
  {
    name: "sendEmailNotificationsDate",
    title: "Email Date",
    type: "date"
  },
  {
    name: "sentEmails",
    title: "Email Status",
    type: "email"
  }
];

export default Filters;
