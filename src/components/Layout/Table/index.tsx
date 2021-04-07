import * as React from "react";
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import toast from "~components/App/Toast";
import DataGrid from "~components/Layout/DataGrid";
import FadeIn from "~components/Layout/FadeIn";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import TableActions from "~components/Layout/TableActions";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { GridColumns, GridPageChangeParams, TURLQuery } from "~types";

export type TTableProps = {
  API: string;
  columns: GridColumns;
  clearFilters: () => void;
  queries: TURLQuery;
  queryString: string;
  updateQuery: (nextQuery: TURLQuery) => void;
};

export type TTableState = {
  data: Array<any>;
  isLoading: boolean;
  totalDocs: number;
};

export type TTableData = {
  docs: Array<any>;
  totalDocs: number;
};

const Table = ({
  API,
  // clearFilters,
  columns,
  queries,
  queryString,
  updateQuery
}: TTableProps): JSX.Element => {
  const [state, setState] = React.useState<TTableState>({
    data: [],
    isLoading: true,
    totalDocs: 0
  });
  const page = parseInt(get(queries, ["page"]), 10) - 1;
  const { data, isLoading, totalDocs } = state;

  const fetchData = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get(`${API}/viewall?${queryString}`);
      const data = parseData<TTableData>(res);

      setState({
        data: data.docs,
        isLoading: false,
        totalDocs: data.totalDocs
      });
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  }, [app, parseData, queryString]);

  const handlePageChange = ({ page }: GridPageChangeParams): void => {
    updateQuery({ page: page + 1 });
  };

  React.useEffect(() => {
    if (isLoading) fetchData();
  }, [isLoading]);

  React.useEffect(() => {
    fetchData();
  }, [queryString]);

  React.useEffect(() => {
    if (!isLoading && isEmpty(data) && totalDocs > 0)
      updateQuery({ page: Math.ceil(totalDocs / 10) });
  }, [isLoading, data, totalDocs]);

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
            rows={data}
            totalDocs={totalDocs}
            handlePageChange={handlePageChange}
            page={page}
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
