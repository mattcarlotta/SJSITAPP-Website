import * as React from "react";
import { useRouter } from "next/router";
import { setQuery, stringifyQuery } from "~utils/queryHelpers";
import { TURLQuery } from "~types";

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
  }) => JSX.Element;
};

export const QueryHandler = ({ children }: TQueryHandlerProps): JSX.Element => {
  const router = useRouter();
  const [state, setState] = React.useState(setQuery(router.query));

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
    setState(setQuery(router.query));
  }, [router.query, setQuery]);

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
