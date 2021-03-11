import moment from "~utils/momentWithTimezone";

export const eventFormat = "YYYY-MM-DD";

/**
 * Helper function to generate an array of dates in the current month and year.
 *
 * @function
 * @param max - a max number of days
 * @param month - the current month
 * @param year - the current year
 * @returns an array of dates in the current month and year
 */

export const generateCalendarDays = (
  max: number,
  month: string,
  year: string
): Array<string> =>
  Array.from({ length: max }, (_, i) =>
    moment(
      `${year}-${month}-${i + 1 < 10 ? `0${i + 1}` : i + 1}`,
      eventFormat
    ).format(eventFormat)
  );

export default generateCalendarDays;
