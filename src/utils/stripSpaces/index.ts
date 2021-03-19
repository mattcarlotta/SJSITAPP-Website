/**
 * Helper function to strip and convert strings to snaked lowercase strings.
 *
 * @returns a snake cased string
 */
const stripSpaces = (name: string): string =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/ /g, "-");

export default stripSpaces;
