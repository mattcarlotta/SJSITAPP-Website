/**
 * Helper function to strip and convert template names to snaked lowercase name.
 *
 * @function
 * @returns {string}
 */
const stripSpaces = (name: string): string =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/ /g, "-");

export default stripSpaces;
