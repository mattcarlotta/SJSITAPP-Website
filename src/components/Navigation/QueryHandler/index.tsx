import * as React from "react";
import { useRouter } from "next/router";
import { setQuery, stringifyQuery } from "~utils/queryHelpers";
import { TURLQuery } from "~types";

export type TQueryHandlerProps = {
  children: ({
    queries,
    clearFilters,
    updateQuery
  }: {
    queries: TURLQuery;
    clearFilters: () => void;
    updateQuery: (nextQuery: TURLQuery) => void;
  }) => JSX.Element;
};

export const QueryHandler = ({ children }: TQueryHandlerProps): JSX.Element => {
  const router = useRouter();
  const [queries, setQueries] = React.useState(setQuery(router.query));

  const pushToLocation = (query: string): void => {
    router.push(`${router.pathname}?${query}`);
  };

  const updateQuery = (nextQuery: TURLQuery): void => {
    pushToLocation(
      stringifyQuery({
        ...queries,
        ...nextQuery
      })
    );
  };

  const clearFilters = () => pushToLocation("page=1");

  React.useEffect(() => {
    setQueries(setQuery(router.query));
  }, [router.query]);

  return (
    <>
      {children({
        ...queries,
        clearFilters,
        updateQuery
      })}
    </>
  );
};

export default QueryHandler;
