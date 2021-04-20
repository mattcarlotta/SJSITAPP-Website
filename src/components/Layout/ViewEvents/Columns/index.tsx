import CallTimes from "~components/Layout/CallTimes";
import Center from "~components/Layout/Center";
import EmailReminders from "~components/Layout/EmailReminders";
import FormatDate from "~components/Layout/FormatDate";
import ScheduledEmployees from "~components/Layout/ScheduledEmployees";
import Team from "~components/Layout/Team";
import { shortDateTimeFormat } from "~utils/dateFormats";
import {
  GridColumns,
  GridValueGetterParams,
  ReactElement,
  TEmployeeIds
} from "~types";

const Columns: GridColumns = [
  { field: "_id", headerName: "Database Id", flex: 2.66 },
  { field: "seasonId", headerName: "Season", width: 110 },
  {
    field: "team",
    headerName: "Team",
    width: 80,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <Team
        team={params.getValue("team") as string}
        folder="lowres"
        size={40}
      />
    )
  },
  {
    field: "opponent",
    headerName: "Opponent",
    width: 80,
    renderCell: (params: GridValueGetterParams): ReactElement =>
      params.getValue("opponent") ? (
        <Team
          team={params.getValue("opponent") as string}
          folder="lowres"
          size={40}
        />
      ) : (
        <Center style={{ width: "100%" }}>-</Center>
      )
  },
  {
    field: "eventType",
    headerName: "Type",
    width: 80
  },
  {
    field: "uniform",
    headerName: "Uniform",
    flex: 2
  },
  {
    field: "eventDate",
    headerName: "Date",
    flex: 2.33,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={shortDateTimeFormat}
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
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <Center style={{ width: "100%" }}>
        {(params.getValue("employeeResponses") as Array<any>).length}
      </Center>
    )
  },
  {
    field: "scheduledIds",
    headerName: "Scheduled Employees",
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <ScheduledEmployees
        employees={params.getValue("scheduledIds") as TEmployeeIds}
      />
    )
  },
  {
    field: "sentEmailReminders",
    headerName: "Email Reminders",
    flex: 0.66,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <EmailReminders
        status={params.getValue("sentEmailReminders") as boolean}
      />
    )
  }
];

export default Columns;
