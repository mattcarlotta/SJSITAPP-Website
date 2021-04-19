import EmailReminders from "~components/Layout/EmailReminders";
import FormatDate from "~components/Layout/FormatDate";
import { dateTimeFormat, standardFormat } from "~utils/dateFormats";
import { GridColumns, GridValueGetterParams, ReactElement } from "~types";

const Columns: GridColumns = [
  { field: "_id", headerName: "Database Id", flex: 2.33 },
  { field: "seasonId", headerName: "Season Id", width: 120 },
  {
    field: "startMonth",
    headerName: "Start Month",
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={standardFormat}
        date={params.getValue("startMonth") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "endMonth",
    headerName: "End Month",
    flex: 1.25,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={standardFormat}
        date={params.getValue("endMonth") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "expirationDate",
    headerName: "Expiration Date",
    flex: 2,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={dateTimeFormat}
        date={params.getValue("expirationDate") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "sendEmailNotificationsDate",
    headerName: "Email Date",
    flex: 2,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={dateTimeFormat}
        date={params.getValue("sendEmailNotificationsDate") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "sentEmails",
    headerName: "Email Status",
    flex: 0.6,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <EmailReminders status={params.getValue("sentEmails") as boolean} />
    )
  }
];

export default Columns;
