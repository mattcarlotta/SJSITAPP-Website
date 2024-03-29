import * as React from "react";
import { useRouter } from "next/router";
import { Dialog } from "@material-ui/core";
import toast from "~components/App/Toast";
import FormTitle from "~components/Forms/FormTitle";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Button from "~components/Layout/Button";
import Card from "~components/Layout/Card";
import CloseModalButton from "~components/Layout/CloseModalButton";
import EmailPreview from "~components/Layout/EmailPreview";
import Form from "~components/Layout/Form";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import SlideTransition from "~components/Layout/SlideTransition";
import SubmitButton from "~components/Layout/SubmitButton";
import { FaEdit, FaTimes } from "~icons";
import app from "~utils/axiosConfig";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { parseData, parseMessage } from "~utils/parseResponse";
import fields from "./Fields";
import { EventTarget, FormEvent, ReactElement } from "~types";

export type TComposeMailFormState = {
  fields: ReturnType<typeof fields>;
  errors: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
};

export type TParsedMailFormFields = {
  message: string;
  subject: string;
  sendTo: Array<string>;
};

export const ComposeMailForm = (): ReactElement => {
  const router = useRouter();
  const [state, setState] = React.useState<TComposeMailFormState>({
    fields: [],
    errors: false,
    isLoading: true,
    isSubmitting: false
  });
  const [isOpen, setOpen] = React.useState(false);
  const { errors, isLoading, isSubmitting } = state;

  const fetchEmployeeList = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get("members/emails");
      const data = parseData<Array<string>>(res);

      setState(prevState => ({
        ...prevState,
        fields: fields(data),
        isLoading: false
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      router.replace("/employee/mail/viewall?page=1");
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const createMail = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.post("mail/create", parseFields(state.fields));
      const message = parseMessage(res);

      toast({ type: "success", message });

      router.push("/employee/mail/viewall?page=1");
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({
        ...prevState,
        isSubmitting: false
      }));
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [state.fields]);

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

  const handlePreview = () => {
    setOpen(prevState => !prevState);
  };

  React.useEffect(() => {
    if (isLoading) fetchEmployeeList();
  }, [isLoading, fetchEmployeeList]);

  React.useEffect(() => {
    if (isSubmitting && !errors) createMail();
  }, [isSubmitting, errors, createMail]);

  return (
    <>
      <Card
        dataTestId="compose-mail-page"
        icon={<FaEdit />}
        title="Compose Email"
        subtitle="Send a list of employees a customized email"
      >
        <Padding top="20px" left="50px" right="50px" bottom="50px">
          <FormTitle
            header="Compose Email"
            title="Send Mail"
            description="Please fill out all the fields below to send an email."
          />
          {isLoading ? (
            <LoadingPanel
              data-testid="loading-mail-form"
              borderRadius="5px"
              height="1100px"
            />
          ) : (
            <Form
              data-testid="compose-mail-form"
              maxWidth="550px"
              onSubmit={handleSubmit}
            >
              <FieldGenerator fields={state.fields} onChange={handleChange} />
              <Button
                primary
                dataTestId="preview-email-button"
                padding="8px 18px"
                margin="10px auto"
                maxWidth="500px"
                fontSize="22px"
                type="button"
                onClick={handlePreview}
              >
                Preview
              </Button>
              <SubmitButton
                isSubmitting={isSubmitting}
                maxWidth="500px"
                title="Send"
              />
            </Form>
          )}
        </Padding>
      </Card>
      {!isLoading && (
        <Dialog
          open={isOpen}
          fullWidth
          maxWidth="lg"
          TransitionComponent={SlideTransition}
          onClose={handlePreview}
        >
          <CloseModalButton
            data-testid="close-modal"
            aria-label="close modal"
            type="button"
            style={{ top: "15px", right: "25px" }}
            onClick={handlePreview}
          >
            <FaTimes style={{ fontSize: 20 }} />
          </CloseModalButton>
          <EmailPreview {...parseFields<TParsedMailFormFields>(state.fields)} />
        </Dialog>
      )}
    </>
  );
};

export default ComposeMailForm;
