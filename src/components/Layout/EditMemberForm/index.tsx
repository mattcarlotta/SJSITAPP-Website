import * as React from "react";
import { css } from "@emotion/react";
import FieldGenerator from "~components/Forms/FieldGenerator";
import MemberDetails from "~components/Layout/MemberDetails";
import SubmitButton from "~components/Layout/SubmitButton";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import fields from "./Fields";
import type { TUpdateUserProfile } from "~actions/Auth";
import { EventTarget, FormEvent, TAuthData, TBaseFieldProps } from "~types";

export type TEditMemberFormState = {
  fields: Array<TBaseFieldProps>;
  errors: boolean;
  isSubmitting: boolean;
};

export type TEditMemberFormProps = {
  id: string;
  avatar?: string;
  email: string;
  emailReminders: boolean;
  editRole?: boolean;
  firstName: string;
  lastName: string;
  role: string;
  registered: string;
  serverError?: string;
  serverMessage?: string;
  status: string;
  updateUserProfile:
    | TUpdateUserProfile
    | ((payload: TAuthData) => Promise<void>);
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

  const handleChange = ({ target: { name, value } }: EventTarget): void => {
    setState(prevState => ({
      ...prevState,
      fields: fieldUpdater(prevState.fields, name, value)
    }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const { validatedFields, errors } = fieldValidator(state.fields);

    setState(prevState => ({
      ...prevState,
      fields: !errors ? prevState.fields : validatedFields,
      errors: !!errors,
      isSubmitting: !errors
    }));
  };

  React.useEffect(() => {
    if (state.isSubmitting && (serverError || serverMessage))
      setState(prevState => ({ ...prevState, isSubmitting: false }));
  }, [state.isSubmitting, serverError, serverMessage]);

  React.useEffect(() => {
    if (state.isSubmitting && !state.errors)
      updateUserProfile({
        ...parseFields<TAuthData>(state.fields),
        id: rest.id
      });
  }, [
    rest.id,
    state.fields,
    state.isSubmitting,
    state.errors,
    updateUserProfile
  ]);

  return (
    <div
      data-testid="edit-member-form-container"
      css={css`
        max-width: 500px;
        width: 100%;
        margin-top: 10px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        background: #eee;
      `}
    >
      <MemberDetails {...rest} />
      <form data-testid="edit-member-form" onSubmit={handleSubmit}>
        <FieldGenerator fields={state.fields} onChange={handleChange} />
        <SubmitButton
          isSubmitting={state.isSubmitting}
          maxWidth="500px"
          title="Save Settings"
        />
      </form>
    </div>
  );
};

export default EditMemberForm;
