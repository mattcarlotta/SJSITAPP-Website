import * as React from "react";
import isEqual from "lodash.isequal";
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
  const [state, setState] = React.useState(setQuery(query));

  const pushToLocation = (query: string): void => {
    router.push(`${router.pathname}?${query}`);
  };

  const updateQuery = (nextQuery: TURLQuery): void => {
    pushToLocation(
      stringifyQuery({
        ...state.queries,
        ...nextQuery
      })
    );
  };

  const clearFilters = () => pushToLocation("page=1");

  React.useEffect(() => {
    /* istanbul ignore next */
    if (!isEqual(query, state.queries)) setState(setQuery(query));
  }, [query]);

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
