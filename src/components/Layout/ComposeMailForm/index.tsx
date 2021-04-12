import * as React from "react";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import FormTitle from "~components/Forms/FormTitle";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Card from "~components/Layout/Card";
import Form from "~components/Layout/Form";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import SubmitButton from "~components/Layout/SubmitButton";
import { FaEdit } from "~icons";
import app from "~utils/axiosConfig";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
// import parseFields from "~utils/parseFields";
import { parseData } from "~utils/parseResponse";
import fields from "./Fields";
import { EventTarget, FormEvent } from "~types";

export type TEditSeasonFormState = {
  fields: ReturnType<typeof fields>;
  errors: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
};

export const ComposeMailForm = (): JSX.Element => {
  const router = useRouter();
  const [state, setState] = React.useState<TEditSeasonFormState>({
    fields: [],
    errors: false,
    isLoading: true,
    isSubmitting: false
  });
  const { isLoading, isSubmitting } = state; // errors

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
  }, [app, parseData, router, toast]);

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
    if (isLoading) fetchEmployeeList();
  }, [isLoading, fetchEmployeeList]);

  // React.useEffect(() => {
  //   if (isSubmitting && !errors) sendMail();
  // }, [isSubmitting, errors, sendMail]);

  return (
    <Card
      dataTestId="compose-mail-page"
      icon={<FaEdit />}
      title="Compose Mail"
      subtitle="Send a list of employees an email"
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Compose Email"
          title="Compose Email"
          description="Please fill out all the fields below to send an email."
        />
        {isLoading ? (
          <LoadingPanel
            data-testid="loading-season"
            borderRadius="5px"
            height="1100px"
          />
        ) : (
          <Form maxWidth="550px" onSubmit={handleSubmit}>
            <FieldGenerator fields={state.fields} onChange={handleChange} />
            <SubmitButton
              isSubmitting={isSubmitting}
              maxWidth="500px"
              title="Send"
            />
          </Form>
        )}
      </Padding>
    </Card>
  );
};

export default ComposeMailForm;
