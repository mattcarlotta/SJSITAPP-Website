import AccountStatus from "~components/Layout/AccountStatus";
import EmailReminders from "~components/Layout/EmailReminders";
import FormatDate from "~components/Layout/FormatDate";
import { dateTimeFormat } from "~utils/dateFormats";
import { GridColumns, GridValueGetterParams, ReactElement } from "~types";

const Columns: GridColumns = [
  {
    field: "status",
    headerName: "Status",
    width: 90,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <AccountStatus status={params.getValue(params.id, "status") as string} />
    )
  },
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.75
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2.5
  },
  {
    field: "registered",
    headerName: "Registered",
    flex: 2,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={dateTimeFormat}
        date={params.getValue(params.id, "registered") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "emailReminders",
    headerName: "Email Reminders",
    flex: 0.66,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <EmailReminders
        status={params.getValue(params.id, "emailReminders") as boolean}
      />
    )
  }
];

export default Columns;
