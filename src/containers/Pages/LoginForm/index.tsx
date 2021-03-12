import * as React from "react";
import { connect } from "react-redux";
import { signinUser } from "~actions/Auth";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import BlackBackground from "~components/Layout/BlackBackground";
import Center from "~components/Layout/Center";
import Modal from "~components/Layout/Modal";
import SubmitButton from "~components/Layout/SubmitButton";
import NavLink from "~components/Navigation/NavLink";
import { FaUnlockAlt } from "~icons";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import fields from "./Fields";
import { EventTarget, FormEvent, TLoginData, TRootState } from "~types";

export type TLoginFormState = {
  fields: typeof fields;
  errors: boolean;
  isSubmitting: boolean;
};

export type TLoginFormProps = {
  serverError?: string;
  signinUser: typeof signinUser;
};

export const LoginForm = ({
  serverError,
  signinUser
}: TLoginFormProps): JSX.Element => {
  const [state, setState] = React.useState<TLoginFormState>({
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
      signinUser(parseFields<TLoginData>(state.fields));
  }, [parseFields, signinUser, state]);

  return (
    <BlackBackground>
      <Modal dataTestId="login-form" isOpen>
        <FormTitle
          header="Login"
          title="Welcome!"
          description="Login into your account below."
        />
        <form onSubmit={handleSubmit}>
          <FieldGenerator fields={state.fields} onChange={handleChange} />
          <Center style={{ marginBottom: 8 }}>
            <NavLink
              blue
              dataTestId="reset-password-link"
              marginRight="0px"
              padding="0px"
              href="/employee/reset-password"
            >
              <FaUnlockAlt />
              &nbsp; Forgot your password?
            </NavLink>
          </Center>
          <SubmitButton
            isSubmitting={state.isSubmitting}
            title="Login"
            style={{ maxWidth: "300px", margin: "0 auto" }}
            submitBtnStyle={{
              background: "#010404",
              border: "2px solid #2e7c8a"
            }}
          />
        </form>
        <Center style={{ marginTop: 10 }}>
          <span style={{ color: "#010404" }}>Don&#39;t have an account?</span>
          &nbsp;
          <NavLink
            blue
            display="inline-block"
            dataTestId="sign-up-link"
            marginRight="0px"
            padding="0px"
            href="/employee/signup"
          >
            Signup
          </NavLink>
        </Center>
      </Modal>
    </BlackBackground>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({ server }: Pick<TRootState, "server">) => ({
  serverError: server.error
});

/* istanbul ignore next */
const mapDispatchToProps = {
  signinUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
