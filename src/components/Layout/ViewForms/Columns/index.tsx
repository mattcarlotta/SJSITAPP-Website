import EmailStatus from "~components/Layout/EmailStatus";
import FormatDate from "~components/Layout/FormatDate";
import {
  dateTimeFormat,
  shortCalendarDateFormat,
  standardFormat
} from "~utils/dateFormats";
import { GridColumns, GridValueGetterParams } from "~types";

const startMonth = (params: GridValueGetterParams): JSX.Element => (
  <FormatDate
    format={standardFormat}
    date={params.getValue("startMonth") as Date}
  />
);

const endMonth = (params: GridValueGetterParams): JSX.Element => (
  <FormatDate
    format={standardFormat}
    date={params.getValue("endMonth") as Date}
  />
);

const expirationDate = (params: GridValueGetterParams): JSX.Element => (
  <FormatDate
    format={dateTimeFormat}
    date={params.getValue("expirationDate") as Date}
  />
);

const sendEmailNotificationsDate = (
  params: GridValueGetterParams
): JSX.Element => (
  <FormatDate
    format={shortCalendarDateFormat}
    date={params.getValue("sendEmailNotificationsDate") as Date}
  />
);

const sentEmails = (params: GridValueGetterParams): JSX.Element => (
  <EmailStatus status={params.getValue("sentEmails") as boolean} />
);

const Columns: GridColumns = [
  { field: "_id", headerName: "Database Id", flex: 2 },
  { field: "seasonId", headerName: "Season Id", flex: 1 },
  {
    field: "startMonth",
    headerName: "Start Month",
    flex: 1,
    renderCell: startMonth
  },
  {
    field: "endMonth",
    headerName: "End Month",
    flex: 1,
    renderCell: endMonth
  },
  {
    field: "expirationDate",
    headerName: "Expiration Date",
    flex: 1.75,
    renderCell: expirationDate
  },
  {
    field: "sendEmailNotificationsDate",
    headerName: "Email Notifications Date",
    flex: 1.25,
    renderCell: sendEmailNotificationsDate
  },
  {
    field: "sentEmails",
    headerName: "Email Status",
    flex: 0.6,
    renderCell: sentEmails
  }
];

export default Columns;
