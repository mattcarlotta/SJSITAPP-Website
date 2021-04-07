import qs from "qs";
import { TURLQuery } from "~types";

/**
 * Stringifies an object of table filter options.
 *
 * @function stringifyQuery
 * @param query - object of queries { id: "123", page: "1" }
 * @returns string
 */
export const stringifyQuery = (query: TURLQuery): string =>
  qs.stringify(query, { skipNulls: true });

/**
 * Parses a stringified query to object
 *
 * @function parseQuery
 * @param query - object of queries { id: "123", page: "1" }
 * @returns query
 */
export const parseQuery = (query: TURLQuery): TURLQuery => ({
  ...query,
  page: parseInt(query.page || 1, 10)
});

/**
 * Utilizes the functions above to parse and strinify a query.
 *
 * @function setQuery
 * @param query - object of queries { id: "123", page: "1" }
 * @returns query
 */
export const setQuery = (
  query: TURLQuery
): {
  queries: TURLQuery;
  queryString: string;
} => {
  const queries = parseQuery(query);
  const queryString = stringifyQuery(queries);

  return { queries, queryString };
};
