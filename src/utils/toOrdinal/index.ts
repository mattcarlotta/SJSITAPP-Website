import moment from "~utils/momentWithTimezone";
/**
 * Helper function to convert a number to a string ordinal, ex: 1st, 2nd, 3rd...etc.
 *
 * @returns an ordinal string
 */
export const toOrdinal = (num: number): string =>
  moment.localeData().ordinal(num);

export default toOrdinal;
