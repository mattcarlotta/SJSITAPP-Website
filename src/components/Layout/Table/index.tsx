import * as React from "react";
import DataGrid from "~components/Layout/DataGrid";
import FadeIn from "~components/Layout/FadeIn";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import TableActions from "~components/Layout/TableActions";
import { GridColumns, GridRowsProp } from "~types";

export type TTableProps = {
  columns: GridColumns;
  isLoading: boolean;
  rows: GridRowsProp;
  totalDocs: number;
};

const Table = ({
  columns,
  isLoading,
  rows,
  totalDocs
}: TTableProps): JSX.Element => {
  return (
    <Padding left="20px" top="20px" right="20px" bottom="40px">
      {isLoading ? (
        <FadeIn>
          <LoadingPanel
            data-testid="loading-data"
            borderRadius="5px"
            height="645px"
          />
        </FadeIn>
      ) : (
        <div
          style={{
            height: 645,
            width: "100%"
          }}
        >
          <DataGrid
            rows={rows}
            totalDocs={totalDocs}
            columns={[
              ...columns,
              {
                field: "actions",
                headerName: "Actions",
                flex: 0.25,
                renderCell: TableActions
              }
            ]}
          />
        </div>
      )}
    </Padding>
  );
};

export default Table;
