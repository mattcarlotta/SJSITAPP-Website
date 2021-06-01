import EmailReminders from "~components/Layout/EmailReminders";
import FormatDate from "~components/Layout/FormatDate";
import { dateTimeFormat, standardFormat } from "~utils/dateFormats";
import { GridColumns, GridValueGetterParams, ReactElement } from "~types";

const Columns: GridColumns = [
  { field: "_id", headerName: "Database Id", sortable: false, flex: 2.33 },
  { field: "seasonId", headerName: "Season Id", sortable: false, width: 120 },
  {
    field: "startMonth",
    headerName: "Start Month",
    sortable: false,
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={standardFormat}
        date={params.getValue(params.id, "startMonth") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "endMonth",
    headerName: "End Month",
    sortable: false,
    flex: 1.25,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={standardFormat}
        date={params.getValue(params.id, "endMonth") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "expirationDate",
    headerName: "Expiration Date",
    sortable: false,
    flex: 2,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={dateTimeFormat}
        date={params.getValue(params.id, "expirationDate") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "sendEmailNotificationsDate",
    headerName: "Email Date",
    sortable: false,
    flex: 2,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={dateTimeFormat}
        date={params.getValue(params.id, "sendEmailNotificationsDate") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "sentEmails",
    headerName: "Email Status",
    sortable: false,
    flex: 0.6,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <EmailReminders
        status={params.getValue(params.id, "sentEmails") as boolean}
      />
    )
  }
];

export default Columns;
