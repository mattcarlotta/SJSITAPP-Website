/* eslint-disable no-console */
import isEmpty from "lodash.isempty";
import moment from "moment-timezone";

export interface IFields {
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

export type TFieldProps = {
  name: string;
  type: string;
  value: string | moment.Moment | Array<moment.Moment>;
  notes: string;
  updateEvent: boolean;
};

/**
 * Helper function to parse a fields' [name]: value from an array into an object.
 *
 * @function
 * @param {array} fields - an array containing fields.
 * @returns {ParseFieldsResult} an object of parsed fields with [name]: value.
 * @throws {error}
 */
const parseFields = <T>(fields: Array<any>): T => {
  try {
    if (isEmpty(fields)) throw new Error("You must supply an array of fields!");

    const parsedFields = fields.reduce(
      (acc, { name, type, value, notes, updateEvent }: TFieldProps) => {
        switch (type) {
          case "time": {
            acc["callTimes"] = acc["callTimes"] || [];
            if (value && moment.isMoment(value))
              acc["callTimes"].push(value.format());
            break;
          }
          case "date": {
            acc[name] = value && moment.isMoment(value) ? value.format() : "";
            break;
          }
          case "range": {
            const values =
              Array.isArray(value) && value.map(val => val.format());
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
