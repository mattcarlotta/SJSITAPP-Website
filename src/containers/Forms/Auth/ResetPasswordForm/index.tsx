import * as React from "react";
import { connect } from "react-redux";
import { resetPassword } from "~actions/Auth";
import Center from "~components/Layout/Center";
import Modal from "~components/Layout/Modal";
import SubmitButton from "~components/Layout/SubmitButton";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import NavLink from "~components/Navigation/NavLink";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import fields from "./Fields";
import { TRootState } from "~reducers";
import {
  EventTarget,
  FC,
  FormEvent,
  TBaseFieldProps,
  TResetPasswordData
} from "~types";

export interface ISignupFormState {
  fields: Array<TBaseFieldProps>;
  errors: boolean;
  isSubmitting: boolean;
}

export interface IResetPasswordFormProps {
  serverError?: string;
  resetPassword: typeof resetPassword;
}

export const ResetPasswordForm: FC<IResetPasswordFormProps> = ({
  resetPassword,
  serverError
}) => {
  const [state, setState] = React.useState<ISignupFormState>({
    fields,
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
    if (state.isSubmitting && serverError)
      setState(prevState => ({ ...prevState, isSubmitting: false }));
  }, [serverError]);

  React.useEffect(() => {
    if (state.isSubmitting && !state.errors)
      resetPassword(parseFields<TResetPasswordData>(state.fields));
  }, [parseFields, resetPassword, state]);

  return (
    <Modal dataTestId="reset-password-form" isOpen>
      <FormTitle
        header="Reset Password"
        title="Reset Password"
        description="Enter your email to request a password reset."
      />
      <form onSubmit={handleSubmit}>
        <FieldGenerator fields={state.fields} onChange={handleChange} />
        <Center style={{ marginBottom: 8 }}>
          <p style={{ margin: 0, padding: 0, fontSize: 16, display: "inline" }}>
            Already have an account?
          </p>
          &nbsp;
          <NavLink
            blue
            dataTestId="login-link"
            style={{ padding: 0, margin: 0, fontSize: 16 }}
            href="/employee/login"
          >
            Log in
          </NavLink>
        </Center>
        <SubmitButton
          isSubmitting={state.isSubmitting}
          title="Reset"
          style={{ width: "300px", margin: "0 auto" }}
          submitBtnStyle={{
            background: "#010404",
            border: "2px solid #2e7c8a"
          }}
        />
      </form>
      <Center style={{ marginTop: 20 }}>
        <span>Don&#39;t have an account?</span> &nbsp;
        <NavLink
          blue
          dataTestId="signup-link"
          style={{ padding: 0, margin: 0 }}
          href="/employee/signup"
        >
          Sign up
        </NavLink>
      </Center>
    </Modal>
  );
};

/* istanbul ignore next */
const mapStateToProps = (state: TRootState) => ({
  serverError: state.server.error
});

/* istanbul ignore next */
const mapDispatchToProps = {
  resetPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
