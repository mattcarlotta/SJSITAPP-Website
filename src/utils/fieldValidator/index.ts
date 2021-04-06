/* eslint-disable no-console */
import isEmpty from "lodash.isempty";
import { TBaseFieldProps } from "~types";

/**
 * Helper function to validate form fields.
 *
 * @function
 * @param {array} fields - an array containing fields.
 * @returns {object} validated fields and number of errors.
 * @throws {error}
 */

const fieldValidator = (
  fields: Array<TBaseFieldProps>
): { validatedFields: Array<TBaseFieldProps>; errors: number } => {
  try {
    if (isEmpty(fields)) throw new Error("You must supply an array of fields!");
    let errorCount = 0;

    const validatedFields = fields.map(field => {
      let errors = "";
      const { name, value, required } = field;
      if ((!value && required) || (isEmpty(value) && required)) {
        errors = "Required.";
      } else {
        if (
          (name === "email" || name === "authorizedEmail") &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value as string)
        )
          errors = "Invalid email.";

        if (name === "password" && value && (value as string).length < 5)
          errors = "Password too short.";

        // if (type === "range" && value && (value as string).length < 2)
        //   errors = "You must select a start and an end date.";

        // if (type === "radiogroup" && !value)
        //   errors = "Please select an option above.";
      }

      if (errors) errorCount += 1;

      return { ...field, errors };
    });

    return { validatedFields, errors: errorCount };
  } catch (err) {
    throw String(err.message);
  }
};

export default fieldValidator;
