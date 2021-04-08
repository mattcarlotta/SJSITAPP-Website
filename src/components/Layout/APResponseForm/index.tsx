import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import Form from "~components/Layout/Form";
import FormatDate from "~components/Layout/FormatDate";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Notes from "~components/Layout/Notes";
import Padding from "~components/Layout/Padding";
import SubmitButton from "~components/Layout/SubmitButton";
import Title from "~components/Layout/Title";
import Header from "~components/Navigation/Header";
import { FaFileSignature } from "~icons";
import app from "~utils/axiosConfig";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { parseData, parseMessage } from "~utils/parseResponse";
import updateFormFields from "./UpdateFormFields";
import { dateTimeFormat, calendarDateFormat } from "~utils/dateFormats";
import condenseFormFields from "./CondenseFormFields";
import {
  EventTarget,
  FormEvent,
  TAPFormData,
  TAPFormDetails,
  TBaseFieldProps,
  TEventResponse
} from "~types";

export type TAPResponseFormState = {
  fields: Array<TBaseFieldProps>;
  form: TAPFormDetails;
  errors: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
};

export type TAPResponseFormParsedFields = {
  _id: string;
  responses: Array<TEventResponse>;
};

const title = "Sharks & Barracuda A/P Form";

const initialState = {
  fields: [],
  form: {} as TAPFormDetails,
  errors: false,
  isLoading: true,
  isSubmitting: false
};

const APResponseForm = (): JSX.Element => {
  const router = useRouter();
  const id = get(router, ["query", "id"]);
  const [state, setState] = React.useState<TAPResponseFormState>(initialState);
  const { errors, fields, form, isSubmitting, isLoading } = state;

  const fetchAPForm = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get(`forms/view/${id}`);
      const data = parseData<TAPFormData>(res);
      const fields = updateFormFields(data.events);

      setState(prevState => ({
        ...prevState,
        fields,
        form: data.form,
        isLoading: false
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      router.replace("/employee/dashboard");
    }
  }, [app, id, parseData, router, toast, updateFormFields]);

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

    if (errors)
      toast({
        type: "error",
        message: "Please fill out all of the required fields."
      });

    setState(prevState => ({
      ...prevState,
      fields: !errors ? prevState.fields : validatedFields,
      errors: !!errors,
      isSubmitting: !errors
    }));
  };

  const submitApForm = React.useCallback(async (): Promise<void> => {
    try {
      const condensedFields = condenseFormFields(fields);

      const res = await app.put("forms/update/ap", {
        ...parseFields<TAPResponseFormParsedFields>(condensedFields),
        id
      });

      toast({ type: "success", message: parseMessage(res) });

      router.push("/employee/dashboard");
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({
        ...prevState,
        isSubmitting: false
      }));
    }
  }, [app, condenseFormFields, fields, parseFields, router, toast]);

  React.useEffect(() => {
    if (isSubmitting && !errors) submitApForm();
  }, [submitApForm, isSubmitting]);

  React.useEffect(() => {
    if (isLoading && id) fetchAPForm();
  }, [isLoading, id, fetchAPForm]);

  return (
    <>
      <Header title="AP Form" url={router.asPath} />
      <Card
        dataTestId="dashboard-availability"
        icon={<FaFileSignature />}
        title={title}
        subtitle="Please select a response for all of the events below."
      >
        <Padding top="20px" bottom="40px" left="40px" right="40px">
          {isLoading ? (
            <LoadingPanel
              data-testid="loading-events"
              borderRadius="5px"
              height="1000px"
            />
          ) : (
            <Form
              data-testid="ap-form"
              margin="0 auto 60px auto"
              maxWidth="625px"
              onSubmit={handleSubmit}
            >
              <Center>
                <Title margin="0px" fontSize="30px" color="#025f6d">
                  Sharks & Barracuda A/P Form
                </Title>
                <Title margin="0px" color="#025f6d">
                  <FormatDate
                    date={form.startMonth}
                    format={calendarDateFormat}
                    style={{ display: "inline" }}
                  />
                  &nbsp;-&nbsp;
                  <FormatDate
                    date={form.endMonth}
                    format={calendarDateFormat}
                    style={{ display: "inline" }}
                  />
                </Title>
                <Title margin="10px 0" fontSize="16px" color="#025f6d">
                  Form expires on:
                  <FormatDate
                    date={form.expirationDate}
                    format={dateTimeFormat}
                    style={{ color: "#f56342" }}
                  />
                </Title>
                <Title margin="10px 0" fontSize="16px" color="#025f6d">
                  Form reminders will be sent out on:
                  <FormatDate
                    date={form.sendEmailNotificationsDate}
                    format={dateTimeFormat}
                    style={{ color: "#f56342" }}
                  />
                </Title>
                {form.notes && <Notes notes={form.notes} />}
                <FieldGenerator fields={fields} onChange={handleChange} />
                <SubmitButton
                  isSubmitting={isSubmitting}
                  maxWidth="625px"
                  title="Submit AP Form"
                  style={{ minHeight: 60 }}
                  submitBtnStyle={{ minHeight: 60 }}
                />
              </Center>
            </Form>
          )}
        </Padding>
      </Card>
    </>
  );
};

export default APResponseForm;
