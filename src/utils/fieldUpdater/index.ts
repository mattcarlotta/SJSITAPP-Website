/* eslint-disable no-console */
import isEmpty from "lodash.isempty";
import { Moment, TBaseFieldProps } from "~types";

/**
 * Helper function to update form fields.
 *
 * @function
 * @param {array} fields - an array containing fields.
 * @param {string} name - name of field to update.
 * @param {string} value - value of field to update.
 * @returns {array} - updated fields.
 * @throws {error}
 */
const fieldUpdater = (
  fields: Array<TBaseFieldProps>,
  name: string,
  value?: string | Array<Moment> | boolean
): Array<TBaseFieldProps> => {
  try {
    if (isEmpty(fields) || !name)
      throw String(
        "You must supply a field array with a name of the field to update!"
      );

    const updatedFields = fields.map(field =>
      field.name === name ? { ...field, value, errors: "" } : field
    );

    return updatedFields;
  } catch (err) {
    throw new Error(err);
  }
};

export default fieldUpdater;
/* eslint-enable no-console */
