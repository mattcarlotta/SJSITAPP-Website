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
  { field: "_id", headerName: "Database Id", sortable: false, flex: 1.5 },
  { field: "seasonId", headerName: "Season", sortable: false, width: 110 },
  {
    field: "team",
    headerName: "Team",
    sortable: false,
    width: 80,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <Team
        team={params.getValue(params.id, "team") as string}
        folder="lowres"
        size={40}
      />
    )
  },
  {
    field: "opponent",
    headerName: "Opponent",
    sortable: false,
    width: 80,
    renderCell: (params: GridValueGetterParams): ReactElement =>
      params.getValue(params.id, "opponent") ? (
        <Team
          team={params.getValue(params.id, "opponent") as string}
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
    sortable: false,
    width: 80
  },
  {
    field: "location",
    headerName: "Location",
    sortable: false,
    flex: 2
  },
  {
    field: "uniform",
    headerName: "Uniform",
    sortable: false,
    flex: 2
  },
  {
    field: "eventDate",
    headerName: "Date",
    sortable: false,
    flex: 2.33,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={shortDateTimeFormat}
        date={params.getValue(params.id, "eventDate") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "callTimes",
    headerName: "Call Times",
    sortable: false,
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <CallTimes
        times={params.getValue(params.id, "callTimes") as Array<string>}
      />
    )
  },
  {
    field: "employeeResponses",
    headerName: "Employee Responses",
    sortable: false,
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <Center style={{ width: "100%" }}>
        {(params.getValue(params.id, "employeeResponses") as Array<any>).length}
      </Center>
    )
  },
  {
    field: "scheduledIds",
    headerName: "Scheduled Employees",
    sortable: false,
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <ScheduledEmployees
        employees={params.getValue(params.id, "scheduledIds") as TEmployeeIds}
      />
    )
  },
  {
    field: "sentEmailReminders",
    headerName: "Email Reminders",
    sortable: false,
    flex: 0.66,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <EmailReminders
        status={params.getValue(params.id, "sentEmailReminders") as boolean}
      />
    )
  }
];

export default Columns;
