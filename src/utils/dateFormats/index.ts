/**
 * Formats year dates as 4 digits: 2020.
 */
export const fullyearFormat = "YYYY";

/**
 * Formats month dates as 2 digits: 01.
 */
export const monthdateFormat = "MM";

/**
 * Formats month dates as week days: Monday.
 */
export const monthnameFormat = "MMMM";

/**
 * Formats moment dates as abbreviated 3 digits months followed by day: Apr 21st
 */
export const shortmonthFormat = "MMM Do";

/**
 * Formats moment dates as 3 digits months, followed by day, 4 digit year, and time: April 21st 2020 @ 12:00pm.
 */
export const dateTimeFormat = `${shortmonthFormat} ${fullyearFormat} @ hh:mm a`;

/**
 * Formats moment dates as 1 digits: 1
 */
export const dayFormat = "D";

/**
 * Formats moment dates as 2 digits: 01
 */
export const fulldayFormat = "DD";

/**
 * Formats moment dates with abbreviated weekday: Tue
 */
export const weekdayFormat = "ddd";

/**
 * Formats moment dates with weekday: Tuesday
 */
export const fullweekdayFormat = "dddd";

/**
 * Default moment formated dates: 2021-03-01T00:00:00Z
 */
export const defaultFormat = `${fullyearFormat}-${monthdateFormat}-${fulldayFormat}THH:mm:ssZ`;

/**
 * Formats moment dates with 4 digit year, 2 digit month and 2 digit day : 2021-03-01
 */
export const eventFormat = `${fullyearFormat}-${monthdateFormat}-${fulldayFormat}`;

/**
 * Formats moment dates with 4 digit year and 2 digit month: 2021 03
 */
export const simpleFormat = `${monthnameFormat} ${fullyearFormat}`;

/**
 * Formats moment dates with 4 digit year and 2 digit month: 2021-03
 */
export const yearMonthFormat = `${fullyearFormat}-${monthnameFormat}`;
