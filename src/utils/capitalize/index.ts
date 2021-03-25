/**
 * Helper function to capitalize the first letter of a string.
 *
 * @param str - a string.
 * @returns a string
 */
const capitalize = (str?: string): string =>
  str ? `${str.charAt(0).toUpperCase()}${str.substring(1)}` : "";

export default capitalize;
