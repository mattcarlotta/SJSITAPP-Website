import FormatDate from "~components/Layout/FormatDate";
import { standardFormat } from "~utils/dateFormats";
import { GridColumns, GridValueGetterParams } from "~types";

const startDate = (params: GridValueGetterParams): JSX.Element => (
  <FormatDate
    format={standardFormat}
    date={params.getValue("startDate") as Date}
  />
);

const endDate = (params: GridValueGetterParams): JSX.Element => (
  <FormatDate
    format={standardFormat}
    date={params.getValue("endDate") as Date}
  />
);

const Columns: GridColumns = [
  { field: "seasonId", headerName: "Season Id", flex: 1 },
  {
    field: "startDate",
    headerName: "Start Date",
    flex: 1,
    renderCell: startDate
  },
  {
    field: "endDate",
    headerName: "End Date",
    flex: 1,
    renderCell: endDate
  }
];

export default Columns;
