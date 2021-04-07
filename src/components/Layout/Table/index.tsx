import { DataGrid } from "@material-ui/data-grid";
import isEmpty from "lodash.isempty";
import Padding from "~components/Layout/Padding";
import { GridColumns, GridRowsProp } from "~types";

export type TTableProps = {
  columns: GridColumns;
  rows: GridRowsProp;
  totalDocs: number;
};

const Table = ({ columns, rows, totalDocs }: TTableProps): JSX.Element => (
  <Padding left="20px" top="20px" right="20px" bottom="40px">
    <div
      style={{
        height: !isEmpty(rows) ? rows.length * 70 : 70,
        width: "100%"
      }}
    >
      <DataGrid
        pagination
        rows={rows}
        rowCount={totalDocs}
        getRowId={row => row._id}
        columns={columns}
        pageSize={10}
        disableColumnMenu
        checkboxSelection={false}
      />
    </div>
  </Padding>
);

export default Table;
