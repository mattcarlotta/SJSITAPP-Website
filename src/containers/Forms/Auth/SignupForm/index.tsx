import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
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
import { signupUser } from "~actions/Auth";
import fields from "./Fields";
import {
  EventTarget,
  FC,
  FormEvent,
  TBaseFieldProps,
  TSignupData,
  TRootState
} from "~types";

export interface ISignupFormState {
  fields: Array<TBaseFieldProps>;
  errors: boolean;
  isSubmitting: boolean;
}

export interface ISignupFormProps {
  serverError?: string;
  signupUser: typeof signupUser;
}

export const SignupForm: FC<ISignupFormProps> = ({
  serverError,
  signupUser
}) => {
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
    <Modal dataTestId="signup-form" isOpen maxWidth="700px">
      <FormTitle
        header="Signup"
        title="Signup"
        description="Fill out all the fields below to register."
      />
      <form onSubmit={handleSubmit}>
        <FieldGenerator fields={state.fields} onChange={handleChange} />
        <Center style={{ marginBottom: 8 }}>
          <NavLink
            blue
            dataTestId="reset-password-link"
            style={{ padding: 0, margin: "0", fontSize: 16 }}
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
          dataTestId="login-link"
          blue
          style={{ padding: 0, margin: 0 }}
          href="/employee/login"
        >
          Login
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
  signupUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
