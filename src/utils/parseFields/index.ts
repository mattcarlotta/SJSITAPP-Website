import isEmpty from "lodash.isempty";
import { TBaseFieldProps } from "~types";
import { timestampFormat } from "~utils/dateFormats";
import moment from "~utils/momentWithTimezone";

/**
 * Helper function to parse a fields' [name]: value from an array into an object.
 *
 * @function
 * @param {array} fields - an array containing fields.
 * @returns {ParseFieldsResult} an object of parsed fields with [name]: value.
 * @throws {error}
 */
const parseFields = <T>(fields: Array<TBaseFieldProps>): T => {
  try {
    if (isEmpty(fields)) throw new Error("You must supply an array of fields!");

    const parsedFields = fields.reduce(
      (acc: any, { name, type, value, notes, updateEvent }) => {
        switch (type) {
          case "calltime": {
            acc["callTimes"] = acc["callTimes"] || [];
            if (value) acc["callTimes"].push(value);
            break;
          }
          case "time": {
            acc[name] = moment(value as string)
              .tz("America/Los_Angeles")
              .format(timestampFormat);
            break;
          }
          case "date": {
            acc[name] = value;
            break;
          }
          case "radiogroup": {
            acc["responses"] = acc["responses"] || [];
            acc["responses"].push({ id: name, value, notes, updateEvent });
            break;
          }
          default: {
            acc[name] = value;
            break;
          }
        }
        return acc;
      },
      {}
    );

    return parsedFields;
  } catch (err) {
    throw String(err.message);
  }
};

export default parseFields;
