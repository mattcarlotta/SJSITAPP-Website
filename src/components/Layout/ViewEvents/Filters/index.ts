import { TFilters } from "~types";

const Filters: TFilters = [
  {
    name: "seasonId",
    title: "Season Id",
    type: "text"
  },
  {
    name: "team",
    title: "Team",
    type: "text"
  },
  {
    name: "opponent",
    title: "Opponent",
    type: "text"
  },
  {
    name: "eventType",
    title: "Event Type",
    type: "text"
  },
  {
    name: "eventDate",
    title: "Event Date",
    type: "date"
  },
  {
    name: "sentEmailReminders",
    title: "Email Reminders",
    type: "email"
  }
];

export default Filters;
