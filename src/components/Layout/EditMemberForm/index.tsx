import * as React from "react";
import { css } from "@emotion/react";
import { updateUserProfile } from "~actions/Auth";
import FieldGenerator from "~components/Forms/FieldGenerator";
import SubmitButton from "~components/Layout/SubmitButton";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import fields from "./Fields";
import { EventTarget, FormEvent, TAuthData, TBaseFieldProps } from "~types";

export type TEditMemberFormState = {
  fields: Array<TBaseFieldProps>;
  errors: boolean;
  isSubmitting: boolean;
};

export type TEditMemberFormProps = {
  id: string;
  avatar: string;
  email: string;
  emailReminders: boolean;
  firstName: string;
  lastName: string;
  role: string;
  serverError?: string;
  serverMessage?: string;
  updateUserProfile: typeof updateUserProfile | (() => void);
};

export const EditMemberForm = ({
  serverError,
  serverMessage,
  updateUserProfile,
  ...rest
}: TEditMemberFormProps): JSX.Element => {
  const [state, setState] = React.useState<TEditMemberFormState>({
    fields: fields(rest),
    errors: false,
    isSubmitting: false
  });

  const handleChange = React.useCallback(
    ({ target: { name, value } }: EventTarget) => {
      setState(prevState => ({
        ...prevState,
        fields: fieldUpdater(prevState.fields, name, value)
      }));
    },
    []
  );

  const handleSubmit = React.useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const { validatedFields, errors } = fieldValidator(state.fields);

      setState(prevState => ({
        ...prevState,
        fields: !errors ? prevState.fields : validatedFields,
        errors: !!errors,
        isSubmitting: !errors
      }));
    },
    [state, fieldValidator]
  );

  React.useEffect(() => {
    if (state.isSubmitting && (serverError || serverMessage))
      setState(prevState => ({ ...prevState, isSubmitting: false }));
  }, [serverError, serverMessage]);

  React.useEffect(() => {
    if (state.isSubmitting && !state.errors)
      updateUserProfile({
        ...parseFields<TAuthData>(state.fields),
        id: rest.id
      });
  }, [parseFields, updateUserProfile, state]);

  return (
    <form
      css={css`
        max-width: 400px;
        width: 100%;
        margin-top: 30px;
      `}
      onSubmit={handleSubmit}
    >
      <FieldGenerator fields={state.fields} onChange={handleChange} />
      <SubmitButton
        isSubmitting={state.isSubmitting}
        title="Update Settings"
        style={{ maxWidth: "300px", margin: "0 auto" }}
        submitBtnStyle={{
          background: "#010404",
          border: "2px solid #2e7c8a"
        }}
      />
    </form>
  );
};

/*
EditMemberForm.propTypes = {
	serverMessage: PropTypes.string,
	updateMember: PropTypes.func.isRequired,
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		email: PropTypes.string,
		emailReminders: PropTypes.bool,
		events: PropTypes.any,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		schedule: PropTypes.any,
		status: PropTypes.string,
	}).isRequired,
};
*/

export default EditMemberForm;