import * as React from "react";
import { connect } from "react-redux";
import { signinUser } from "~actions/Auth";
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
  ConnectedProps,
  EventTarget,
  FormEvent,
  PickReduxState,
  ReactElement,
  TLoginData
} from "~types";

/* istanbul ignore next */
const mapState = ({ server }: PickReduxState<"server">) => ({
  serverError: server.error
});

/* istanbul ignore next */
const mapDispatch = {
  signinUser
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type TLoginFormState = {
  fields: typeof fields;
  errors: boolean;
  isSubmitting: boolean;
};

export const LoginForm = ({
  serverError,
  signinUser
}: PropsFromRedux): ReactElement => {
  const [state, setState] = React.useState<TLoginFormState>({
    fields,
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
    if (state.isSubmitting && serverError)
      setState(prevState => ({ ...prevState, isSubmitting: false }));
  }, [serverError]);

  React.useEffect(() => {
    if (state.isSubmitting && !state.errors)
      signinUser(parseFields<TLoginData>(state.fields));
  }, [parseFields, signinUser, state]);

  return (
    <WhiteBackground>
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
            maxWidth="300px"
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
    </WhiteBackground>
  );
};

export default connector(LoginForm);
