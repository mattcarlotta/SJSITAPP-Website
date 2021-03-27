import * as React from "react";
import { css } from "@emotion/react";
import toast from "~components/App/Toast";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import Card from "~components/Layout/Card";
import Margin from "~components/Layout/Margin";
import Padding from "~components/Layout/Padding";
import SubmitButton from "~components/Layout/SubmitButton";
import { FaConciergeBell } from "~icons";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import app from "~utils/axiosConfig";
import { parseMessage } from "~utils/parseResponse";
import fields from "./Fields";
import { EventTarget, FormEvent } from "~types";

export type TContactUsFormState = {
  fields: typeof fields;
  errors: boolean;
  isSubmitting: boolean;
};

export const ContactUsForm = (): JSX.Element => {
  const [state, setState] = React.useState<TContactUsFormState>({
    fields,
    errors: false,
    isSubmitting: false
  });

  const sendMail = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.post("mail/contact", parseFields(state.fields));
      const message = parseMessage(res);

      toast({ type: "success", message });

      setState(prevState => ({
        ...prevState,
        errors: false,
        isSubmitting: false,
        fields
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({
        ...prevState,
        isSubmitting: false
      }));
    }
  }, [app, parseFields, parseMessage, state.fields]);

  const handleChange = React.useCallback(
    ({ target: { name, value } }: EventTarget) => {
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
    if (state.isSubmitting && !state.errors) sendMail();
  }, [state.isSubmitting, state.errors]);

  return (
    <Card
      dataTestId="contact-us-page"
      icon={<FaConciergeBell />}
      title="Contact Us"
      subtitle="Questions and Feedback Form"
    >
      <Padding left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Contact Us"
          title="Contact Us"
          description="Please fill out the fields below to send us a message."
        />
        <form
          css={css`
            max-width: 500px;
            margin: 0 auto;
          `}
          onSubmit={handleSubmit}
        >
          <FieldGenerator fields={state.fields} onChange={handleChange} />
          <SubmitButton
            isSubmitting={state.isSubmitting}
            maxWidth="500px"
            title="Send"
          />
          <Margin as="div" top="30px">
            By clicking the &quot;Send&quot; button, you agree to allow us to
            use your email address as a &quot;Sent From&quot; addresser. Using
            your email adress, an email with the subject and message supplied
            above will be generated and sent to one or many of the &quot;Send
            To&quot; addresses associated with the Sharks Ice Team.
          </Margin>
        </form>
      </Padding>
    </Card>
  );
};

export default ContactUsForm;
