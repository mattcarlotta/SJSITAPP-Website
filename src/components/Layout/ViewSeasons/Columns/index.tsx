import FormatDate from "~components/Layout/FormatDate";
import { standardFormat } from "~utils/dateFormats";
import { GridColumns, GridValueGetterParams } from "~types";

const Columns: GridColumns = [
  { field: "_id", headerName: "Database Id", flex: 1 },
  { field: "seasonId", headerName: "Season Id", flex: 1 },
  {
    field: "startDate",
    headerName: "Start Date",
    flex: 1,
    renderCell: (params: GridValueGetterParams): JSX.Element => (
      <FormatDate
        format={standardFormat}
        date={params.getValue("startDate") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "endDate",
    headerName: "End Date",
    flex: 1,
    renderCell: (params: GridValueGetterParams): JSX.Element => (
      <FormatDate
        format={standardFormat}
        date={params.getValue("endDate") as Date}
        style={{ width: "100%" }}
      />
    )
  }
];

export default Columns;
