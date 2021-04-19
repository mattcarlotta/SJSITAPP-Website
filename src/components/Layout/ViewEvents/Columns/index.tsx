import CallTimes from "~components/Layout/CallTimes";
import Center from "~components/Layout/Center";
import EmailReminders from "~components/Layout/EmailReminders";
import FormatDate from "~components/Layout/FormatDate";
import ScheduledEmployees from "~components/Layout/ScheduledEmployees";
import Team from "~components/Layout/Team";
import { dateTimeFormat } from "~utils/dateFormats";
import {
  GridColumns,
  GridValueGetterParams,
  ReactElement,
  TEmployeeIds
} from "~types";

const Columns: GridColumns = [
  { field: "_id", headerName: "Database Id", flex: 2.25 },
  { field: "seasonId", headerName: "Season Id", width: 110 },
  {
    field: "team",
    headerName: "Team",
    width: 60,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <Team
        team={params.getValue("team") as string}
        size={30}
        folder="calendar"
      />
    )
  },
  {
    field: "opponent",
    headerName: "Opponent",
    width: 60,
    renderCell: (params: GridValueGetterParams): ReactElement =>
      params.getValue("opponent") ? (
        <Team
          team={params.getValue("opponent") as string}
          size={30}
          folder="calendar"
        />
      ) : (
        <span>-</span>
      )
  },
  {
    field: "eventType",
    headerName: "Event Type",
    width: 80
  },
  {
    field: "uniform",
    headerName: "Uniform",
    flex: 2.33
  },
  {
    field: "eventDate",
    headerName: "Event Date",
    flex: 2,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={dateTimeFormat}
        date={params.getValue("eventDate") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "callTimes",
    headerName: "Call Times",
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <CallTimes times={params.getValue("callTimes") as Array<string>} />
    )
  },
  {
    field: "employeeResponses",
    headerName: "Employee Responses",
    width: 70,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <Center style={{ width: "100%" }}>
        {(params.getValue("employeeResponses") as Array<any>).length}
      </Center>
    )
  },
  {
    field: "scheduledIds",
    headerName: "Scheduled Employees",
    width: 70,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <ScheduledEmployees
        employees={params.getValue("scheduledIds") as TEmployeeIds}
      />
    )
  },
  {
    field: "sentEmailReminders",
    headerName: "Email Reminders",
    flex: 0.6,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <EmailReminders
        status={params.getValue("sentEmailReminders") as boolean}
      />
    )
  }
];

export default Columns;
