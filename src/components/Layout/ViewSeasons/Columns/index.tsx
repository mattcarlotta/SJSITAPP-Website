import FormatDate from "~components/Layout/FormatDate";
import { standardFormat } from "~utils/dateFormats";
import { GridColumns, GridValueGetterParams, ReactElement } from "~types";

const Columns: GridColumns = [
  { field: "_id", headerName: "Database Id", sortable: false, flex: 1 },
  { field: "seasonId", headerName: "Season Id", sortable: false, flex: 1 },
  {
    field: "startDate",
    headerName: "Start Date",
    sortable: false,
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={standardFormat}
        date={params.getValue(params.id, "startDate") as Date}
        style={{ width: "100%" }}
      />
    )
  },
  {
    field: "endDate",
    headerName: "End Date",
    sortable: false,
    flex: 1,
    renderCell: (params: GridValueGetterParams): ReactElement => (
      <FormatDate
        format={standardFormat}
        date={params.getValue(params.id, "endDate") as Date}
        style={{ width: "100%" }}
      />
    )
  }
];

export default Columns;
