import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateUserPassword } from "~actions/Auth";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import Modal from "~components/Layout/Modal";
import SubmitButton from "~components/Layout/SubmitButton";
import WhiteBackground from "~components/Layout/WhiteBackground";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import fields from "./Fields";
import {
  EventTarget,
  FormEvent,
  TBaseFieldProps,
  TNewPasswordData,
  TRootState
} from "~types";

export type ISignupFormState = {
  fields: Array<TBaseFieldProps>;
  token: string;
  errors: boolean;
  isSubmitting: boolean;
};

export type TSignupFormProps = {
  serverError?: string;
  updateUserPassword: typeof updateUserPassword;
};

export const NewPasswordForm = ({
  serverError,
  updateUserPassword
}: TSignupFormProps): JSX.Element => {
  const router = useRouter();
  const token = get(router, ["query", "token"]);
  const [state, setState] = React.useState({
    fields,
    token: "",
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
    setState(prevState => ({ ...prevState, token: token as string }));
  }, [token]);

  React.useEffect(() => {
    if (state.isSubmitting && serverError)
      setState(prevState => ({ ...prevState, isSubmitting: false }));
  }, [serverError]);

  React.useEffect(() => {
    if (state.isSubmitting && !state.errors)
      updateUserPassword({
        ...parseFields<Pick<TNewPasswordData, "password">>(state.fields),
        token: state.token
      });
  }, [parseFields, updateUserPassword, state]);

  return (
    <WhiteBackground>
      <Modal dataTestId="signup-form" isOpen>
        <FormTitle
          header="Update Password"
          title="Update Password"
          description="Enter a new password to update your current password."
        />
        <form onSubmit={handleSubmit}>
          <FieldGenerator fields={state.fields} onChange={handleChange} />
          <SubmitButton
            isSubmitting={state.isSubmitting}
            title="Update"
            maxWidth="250px"
          />
        </form>
      </Modal>
    </WhiteBackground>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({ server }: Pick<TRootState, "server">) => ({
  serverError: server.error
});

/* istanbul ignore next */
const mapDispatchToProps = {
  updateUserPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordForm);
