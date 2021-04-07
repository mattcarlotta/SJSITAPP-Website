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
import { parseData, parseMessage } from "~utils/parseResponse";
import {
  GridColumns,
  GridPageChangeParams,
  GridValueGetterParams,
  TURLQuery
} from "~types";

export type TTableProps = {
  API: string;
  columns: GridColumns;
  clearFilters: () => void;
  edit?: string;
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

const initalState = {
  data: [],
  isLoading: true,
  totalDocs: 0
};

const Table = ({
  API,
  // clearFilters,
  columns,
  queries,
  queryString,
  updateQuery,
  ...rest
}: TTableProps): JSX.Element => {
  const [state, setState] = React.useState<TTableState>(initalState);
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

  const deleteRecord = React.useCallback(
    async (id: string): Promise<void> => {
      try {
        const res = await app.delete(`${API}/delete/${id}`);
        const message = parseMessage(res);

        toast({ type: "success", message });

        setState(initalState);
      } catch (err) {
        toast({ type: "error", message: err.toString() });
      }
    },
    [app, parseMessage, toast]
  );

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
                flex: 0.4,
                renderCell: (params: GridValueGetterParams) =>
                  TableActions({ deleteRecord, params, ...rest })
              }
            ]}
          />
        </div>
      )}
    </Padding>
  );
};

export default Table;
