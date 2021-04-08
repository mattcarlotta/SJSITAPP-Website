/* eslint-disable react/display-name */
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
  GridColDef,
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
  const { data, isLoading, totalDocs } = state;
  const page = parseInt(get(queries, ["page"]), 10) - 1;
  const invalidPage = !isLoading && isEmpty(data) && totalDocs > 0;

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
  }, [API, app, parseData, queryString]);

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
    [API, app, parseMessage, toast]
  );

  const columnsWithActions = React.useMemo(
    (): Array<GridColDef> => [
      ...columns,
      {
        field: "actions",
        headerName: "Actions",
        width: 95,
        renderCell: (params: GridValueGetterParams): JSX.Element => (
          <TableActions deleteRecord={deleteRecord} params={params} {...rest} />
        )
      }
    ],
    [columns]
  );

  React.useEffect(() => {
    if (isLoading) fetchData();
  }, [isLoading]);

  React.useEffect(() => {
    if (!isLoading) fetchData();
  }, [queryString]);

  React.useEffect(() => {
    if (invalidPage) updateQuery({ page: Math.ceil(totalDocs / 10) });
  }, [invalidPage]);

  return (
    <Padding left="20px" top="20px" right="20px" bottom="40px">
      {isLoading || invalidPage ? (
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
            columns={columnsWithActions}
          />
        </div>
      )}
    </Padding>
  );
};

export default Table;
