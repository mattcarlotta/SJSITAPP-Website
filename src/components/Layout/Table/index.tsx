import DataGrid from "~components/Layout/DataGrid";
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
        height: 645,
        width: "100%"
      }}
    >
      <DataGrid rows={rows} totalDocs={totalDocs} columns={columns} />
    </div>
  </Padding>
);

export default Table;
