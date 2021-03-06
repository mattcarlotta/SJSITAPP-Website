import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { signupUser } from "~actions/Auth";
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
import {
  EventTarget,
  FormEvent,
  TBaseFieldProps,
  TSignupData,
  TRootState
} from "~types";

export type TSignupFormState = {
  fields: Array<TBaseFieldProps>;
  errors: boolean;
  isSubmitting: boolean;
};

export type TSignupFormProps = {
  serverError?: string;
  signupUser: typeof signupUser;
};

export const SignupForm = ({
  serverError,
  signupUser
}: TSignupFormProps): JSX.Element => {
  const router = useRouter();
  const token = get(router, ["query", "token"]);
  const [state, setState] = React.useState({
    fields: fields(),
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
    setState(prevState => ({ ...prevState, fields: fields(token as string) }));
  }, [token]);

  React.useEffect(() => {
    if (state.isSubmitting && serverError)
      setState(prevState => ({ ...prevState, isSubmitting: false }));
  }, [serverError]);

  React.useEffect(() => {
    if (state.isSubmitting && !state.errors)
      signupUser(parseFields<TSignupData>(state.fields));
  }, [parseFields, signupUser, state]);

  return (
    <BlackBackground>
      <Modal dataTestId="signup-form" isOpen maxWidth="600px">
        <form onSubmit={handleSubmit}>
          <FormTitle
            header="Signup"
            title="Signup"
            description="Fill out all the fields below to register."
          />
          <FieldGenerator fields={state.fields} onChange={handleChange} />
          <Center style={{ marginBottom: 8 }}>
            <NavLink
              blue
              dataTestId="reset-password-link"
              padding="0px"
              marginRight="0px"
              href="/employee/reset-password"
            >
              <FaUnlockAlt />
              &nbsp; Forgot your password?
            </NavLink>
          </Center>
          <SubmitButton
            isSubmitting={state.isSubmitting}
            title="Register"
            style={{ width: "300px", margin: "0 auto" }}
            submitBtnStyle={{
              background: "#010404",
              border: "2px solid #2e7c8a"
            }}
          />
        </form>
        <Center style={{ marginTop: 10 }}>
          Already have an account? &nbsp;
          <NavLink
            blue
            dataTestId="login-link"
            display="inline-block"
            padding="0px"
            marginRight="0px"
            href="/employee/login"
          >
            Login
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
  signupUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
