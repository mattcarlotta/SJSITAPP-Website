import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { signupUser } from "~actions/Auth";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import Center from "~components/Layout/Center";
import Modal from "~components/Layout/Modal";
import SubmitButton from "~components/Layout/SubmitButton";
import WhiteBackground from "~components/Layout/WhiteBackground";
import NavLink from "~components/Navigation/NavLink";
import { FaUnlockAlt } from "~icons";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import fields from "./Fields";
import {
  EventTarget,
  ConnectedProps,
  FormEvent,
  TBaseFieldProps,
  TSignupData,
  TRootState
} from "~types";

/* istanbul ignore next */
const mapState = ({ server }: Pick<TRootState, "server">) => ({
  serverError: server.error
});

/* istanbul ignore next */
const mapDispatch = {
  signupUser
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type TSignupFormState = {
  fields: Array<TBaseFieldProps>;
  errors: boolean;
  isSubmitting: boolean;
};

export const SignupForm = ({
  serverError,
  signupUser
}: PropsFromRedux): JSX.Element => {
  const router = useRouter();
  const token = get(router, ["query", "token"]);
  const [state, setState] = React.useState({
    fields: fields(),
    errors: false,
    isSubmitting: false
  });

  const handleChange = React.useCallback(
    ({ target: { name, value } }: EventTarget): void => {
      setState(prevState => ({
        ...prevState,
        fields: fieldUpdater(prevState.fields, name, value)
      }));
    },
    []
  );

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
    <WhiteBackground>
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
            maxWidth="300px"
            title="Register"
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
    </WhiteBackground>
  );
};

export default connector(SignupForm);
