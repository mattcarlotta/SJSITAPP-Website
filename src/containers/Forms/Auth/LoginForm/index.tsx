import * as React from "react";
import { connect } from "react-redux";
import { FaUnlockAlt } from "react-icons/fa";
import Center from "~components/Layout/Center";
import Modal from "~components/Layout/Modal";
import SubmitButton from "~components/Layout/SubmitButton";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import NavLink from "~components/Navigation/NavLink";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { signinUser } from "~actions/Auth";
import fields from "./Fields";
import { TRootState } from "~reducers";
import { FC, TBaseFieldProps } from "~types";

export interface ILoginFormState {
  fields: typeof fields;
  errors: boolean;
  isSubmitting: boolean;
}

export interface ILoginFormProps {
  serverError?: string;
  signinUser: typeof signinUser;
}

export type ISubmitProps = {
  email: string;
  password: string;
};

const LoginForm: FC<ILoginFormProps> = ({ serverError, signinUser }) => {
  const [state, setState] = React.useState<ILoginFormState>({
    fields,
    errors: false,
    isSubmitting: false
  });

  const handleChange = React.useCallback(({ target: { name, value } }) => {
    setState(prevState => ({
      ...prevState,
      fields: fieldUpdater(prevState.fields, name, value)
    }));
  }, []);

  const handleSubmit = React.useCallback(
    e => {
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
    if (state.isSubmitting)
      setState(prevState => ({ ...prevState, isSubmitting: false }));
  }, [serverError]);

  React.useEffect(() => {
    if (state.isSubmitting && !state.errors)
      signinUser(parseFields<TBaseFieldProps[], ISubmitProps>(state.fields));
  }, [parseFields, signinUser, state]);

  return (
    <Modal isOpen dataTestId="login-modal">
      <FormTitle
        header="Log In"
        title="Welcome!"
        description="Sign into your account below."
      />
      <form onSubmit={handleSubmit}>
        <FieldGenerator fields={state.fields} onChange={handleChange} />
        <NavLink
          blue
          dataTestId="reset-password-link"
          style={{ padding: 0, margin: 0, fontSize: 16 }}
          href="/employee/reset-password"
        >
          <FaUnlockAlt />
          &nbsp; Forgot your password?
        </NavLink>
        <SubmitButton isSubmitting={state.isSubmitting} title="Log In" />
      </form>
      <Center style={{ marginTop: 20 }}>
        <span>Don&#39;t have an account?</span> &nbsp;
        <NavLink
          blue
          dataTestId="sign-up-link"
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
  signinUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
