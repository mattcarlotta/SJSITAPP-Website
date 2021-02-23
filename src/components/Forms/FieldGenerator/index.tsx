import * as React from "react";
import Input from "~components/Forms/Input";
import TextArea from "~components/Forms/TextArea";
import { ChangeEvent, TBaseFieldProps } from "~types";

/**
 * Reusable function that converts an object of properties into a React form components.
 *
 * @param {array} fields - an array of field objects ex:
 * [{ name: "userName",
 *   type: "text",
 *   label: "Username",
 *   value: "",
 *   errors: "",
 *   style: { width: "50%" },
 *   required: true
 *  }]
 * @param {function} onChange - a function to update component state.
 * @returns {JSX.Element} a React component
 */

const FieldGenerator = <
  T extends Array<TBaseFieldProps>,
  K extends (e: ChangeEvent<any>) => void
>({
  fields,
  onChange
}: {
  fields: T;
  onChange: K;
}): JSX.Element => (
  <>
    {fields.map(({ name, value, type, ...rest }) => {
      switch (type) {
        case "text":
        case "email":
        case "password": {
          return (
            <Input
              {...rest}
              key={name}
              name={name}
              type={type}
              value={value as string}
              onChange={onChange}
            />
          );
        }
        case "textarea": {
          return (
            <TextArea
              {...rest}
              key={name}
              name={name}
              value={value as string}
              onChange={onChange}
            />
          );
        }
        default:
          return (
            <div key={name} data-testid="invalid-component">
              Not a valid component
            </div>
          );
      }
    })}
  </>
);

export default FieldGenerator;
