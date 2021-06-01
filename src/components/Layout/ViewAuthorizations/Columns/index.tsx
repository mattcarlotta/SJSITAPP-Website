import FormatDate from "~components/Layout/FormatDate";
import TokenStatus from "~components/Layout/TokenStatus";
import { dateTimeFormat } from "~utils/dateFormats";
import { GridColumns, GridValueGetterParams, ReactElement } from "~types";

const Columns: GridColumns = [
  {
    field: "email",
    headerName: "Status",
    sortable: false,
    width: 90,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <TokenStatus email={params.getValue(params.id, "email") as string} />
    )
  },
  {
    field: "authorizedEmail",
    headerName: "Authorized Email",
    sortable: false,
    flex: 2
  },
  {
    field: "role",
    headerName: "Role",
    sortable: false,
    width: 110
  },
  {
    field: "token",
    headerName: "Authorization Token",
    sortable: false,
    flex: 2.75
  },
  {
    field: "expiration",
    headerName: "Expiration Date",
    sortable: false,
    flex: 1.6,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={dateTimeFormat}
        date={params.getValue(params.id, "expiration") as Date}
        style={{ width: "100%" }}
      />
    )
  }
];

export default Columns;
