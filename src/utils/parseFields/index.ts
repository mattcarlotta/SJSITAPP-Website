/* eslint-disable no-console */
import isEmpty from "lodash.isempty";
import moment from "moment-timezone";

export interface Fields {
  callTimes?: Array<moment.Moment>;
  date?: moment.Moment;
  range?: Array<moment.Moment>;
  radiogroup?: any;
  responses?: Array<{
    id: string;
    value: string;
    notes?: string;
    updateEvent?: boolean;
  }>;
  email?: string;
  password?: string;
}

/**
 * Helper function to parse a fields' [name]: value from an array into an object.
 *
 * @function
 * @param {array} fields - an array containing fields.
 * @returns {ParseFieldsResult} an object of parsed fields with [name]: value.
 * @throws {error}
 */
const parseFields = <T extends Array<any>, U>(fields: T): U => {
  try {
    if (isEmpty(fields)) throw new Error("You must supply an array of fields!");

    const parsedFields = fields.reduce(
      (acc, { name, type, value, notes, updateEvent }) => {
        switch (type) {
          case "time": {
            acc["callTimes"] = acc["callTimes"] || [];
            if (value) acc["callTimes"].push(value.format());
            break;
          }
          case "date": {
            acc[name] = value ? value.format() : "";
            break;
          }
          case "range": {
            const values = value.map((val: moment.Moment) => val.format());
            acc[name] = values;
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
    throw String(err);
  }
};

export default parseFields;
