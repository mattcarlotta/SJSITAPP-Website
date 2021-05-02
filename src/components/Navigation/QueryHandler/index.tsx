import * as React from "react";
import { useRouter } from "next/router";
import { setQuery, stringifyQuery } from "~utils/queryHelpers";
import { ReactElement, TURLQuery } from "~types";

export type TQueryHandlerProps = {
  children: ({
    queries,
    queryString,
    clearFilters,
    updateQuery
  }: {
    queries: TURLQuery;
    queryString: string;
    clearFilters: () => void;
    updateQuery: (nextQuery: TURLQuery) => void;
  }) => ReactElement;
};

export const QueryHandler = ({
  children
}: TQueryHandlerProps): ReactElement => {
  const router = useRouter();
  const { query } = router;
  const getQueries = React.useMemo(() => setQuery(query), [query]);
  const [state, setState] = React.useState(getQueries);

  const pushToLocation = React.useCallback((query: string): void => {
    router.push(`${router.pathname}?${query}`);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const updateQuery = React.useCallback(
    (nextQuery: TURLQuery): void => {
      pushToLocation(
        stringifyQuery({
          ...state.queries,
          ...nextQuery
        })
      );
    },
    [state.queries, pushToLocation]
  );

  const clearFilters = () => pushToLocation("page=1");

  React.useEffect(() => {
    setState(getQueries);
  }, [getQueries]);

  return (
    <>
      {children({
        ...state,
        clearFilters,
        updateQuery
      })}
    </>
  );
};

export default QueryHandler;
