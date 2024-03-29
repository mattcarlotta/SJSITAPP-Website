import * as React from "react";
import { connect } from "react-redux";
import { resetPassword } from "~actions/Auth";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import Center from "~components/Layout/Center";
import Modal from "~components/Layout/Modal";
import SubmitButton from "~components/Layout/SubmitButton";
import WhiteBackground from "~components/Layout/WhiteBackground";
import NavLink from "~components/Navigation/NavLink";
import { BsPeopleCircle } from "~icons";
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
  TBaseFieldProps,
  TResetPasswordData
} from "~types";

/* istanbul ignore next */
const mapState = ({ server }: PickReduxState<"server">) => ({
  serverError: server.error
});

/* istanbul ignore next */
const mapDispatch = {
  resetPassword
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type TSignupFormState = {
  fields: Array<TBaseFieldProps>;
  errors: boolean;
  isSubmitting: boolean;
};

export const ResetPasswordForm = ({
  resetPassword,
  serverError
}: PropsFromRedux): ReactElement => {
  const [state, setState] = React.useState<TSignupFormState>({
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
  }, [state.isSubmitting, serverError]);

  React.useEffect(() => {
    if (state.isSubmitting && !state.errors)
      resetPassword(parseFields<TResetPasswordData>(state.fields));
  }, [resetPassword, state]);

  return (
    <WhiteBackground>
      <Modal dataTestId="reset-password-form" isOpen maxWidth="450px">
        <FormTitle
          header="Reset Password"
          title="Reset Password"
          description="Enter your email to request a password reset."
        />
        <form onSubmit={handleSubmit}>
          <FieldGenerator fields={state.fields} onChange={handleChange} />
          <Center style={{ marginBottom: 8 }}>
            <NavLink
              blue
              dataTestId="login-link"
              padding="0px"
              marginRight="0px"
              href="/employee/login"
            >
              <BsPeopleCircle
                style={{ position: "relative", top: 2, fontSize: 18 }}
              />
              &nbsp; Already have an account?
            </NavLink>
          </Center>
          <SubmitButton
            isSubmitting={state.isSubmitting}
            maxWidth="300px"
            title="Reset"
          />
        </form>
        <Center style={{ marginTop: 20 }}>
          <span style={{ color: "#010404" }}>Don&#39;t have an account?</span>
          &nbsp;
          <NavLink
            blue
            display="inline-block"
            dataTestId="signup-link"
            padding="0px"
            marginRight="0px"
            href="/employee/signup"
          >
            Sign up
          </NavLink>
        </Center>
      </Modal>
    </WhiteBackground>
  );
};

export default connector(ResetPasswordForm);
