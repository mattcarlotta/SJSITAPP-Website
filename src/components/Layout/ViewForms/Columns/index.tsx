/* eslint-disable react/display-name */
import EmailStatus from "~components/Layout/EmailStatus";
import FormatDate from "~components/Layout/FormatDate";
import { dateTimeFormat, standardFormat } from "~utils/dateFormats";
import { GridColumns, GridValueGetterParams } from "~types";

const Columns: GridColumns = [
  { field: "_id", headerName: "Database Id", flex: 2 },
  { field: "seasonId", headerName: "Season Id", width: 120 },
  {
    field: "startMonth",
    headerName: "Start Month",
    flex: 1,
    renderCell: (params: GridValueGetterParams): JSX.Element => (
      <FormatDate
        format={standardFormat}
        date={params.getValue("startMonth") as Date}
      />
    )
  },
  {
    field: "endMonth",
    headerName: "End Month",
    flex: 1,
    renderCell: (params: GridValueGetterParams): JSX.Element => (
      <FormatDate
        format={standardFormat}
        date={params.getValue("endMonth") as Date}
      />
    )
  },
  {
    field: "expirationDate",
    headerName: "Expiration Date",
    flex: 2,
    renderCell: (params: GridValueGetterParams): JSX.Element => (
      <FormatDate
        format={dateTimeFormat}
        date={params.getValue("expirationDate") as Date}
      />
    )
  },
  {
    field: "sendEmailNotificationsDate",
    headerName: "Email Notifications Date",
    flex: 2,
    renderCell: (params: GridValueGetterParams): JSX.Element => (
      <FormatDate
        format={dateTimeFormat}
        date={params.getValue("sendEmailNotificationsDate") as Date}
      />
    )
  },
  {
    field: "sentEmails",
    headerName: "Email Status",
    flex: 0.6,
    renderCell: (params: GridValueGetterParams): JSX.Element => (
      <EmailStatus status={params.getValue("sentEmails") as boolean} />
    )
  }
];

export default Columns;
