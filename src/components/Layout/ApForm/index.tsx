import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import toast from "~components/App/Toast";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Card from "~components/Layout/Card";
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

export type TAPFormState = {
  fields: Array<TBaseFieldProps>;
  form: TAPFormDetails;
  errors: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
};

export type TApParsedFields = {
  _id: string;
  responses: Array<TEventResponse>;
};

const title = "Sharks & Barracuda A/P Form";

const APForm = (): JSX.Element => {
  const router = useRouter();
  const id = get(router, ["query", "id"]);
  const [state, setState] = React.useState<TAPFormState>({
    fields: [],
    form: {} as TAPFormDetails,
    errors: false,
    isLoading: true,
    isSubmitting: false
  });
  const { errors, fields, form, isSubmitting, isLoading } = state;

  const fetchAPForm = React.useCallback(async () => {
    try {
      const res = await app.get(`form/view/${id}`);
      const data = parseData<TAPFormData>(res);
      const fields = updateFormFields(data);

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
  }, [id]);

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

  const submitApForm = React.useCallback(async () => {
    try {
      const condensedFields = condenseFormFields(fields);

      const res = await app.put("form/update/ap", {
        ...parseFields<TApParsedFields>(condensedFields),
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
  }, [fields, id]);

  React.useEffect(() => {
    if (isSubmitting && !errors) submitApForm();
  }, [submitApForm, isSubmitting]);

  React.useEffect(() => {
    if (isLoading) fetchAPForm();
  }, [isLoading, fetchAPForm]);

  return (
    <>
      <Header title="AP Form" url={router.asPath} />
      <Card
        dataTestId="dashboard-availability"
        icon={<FaFileSignature />}
        title={title}
        subtitle="Please select an availability response for all events below."
      >
        <Padding top="30px" bottom="40px" left="40px" right="40px">
          {isLoading ? (
            <LoadingPanel
              data-testid="loading-events"
              borderRadius="5px"
              height="1000px"
            />
          ) : (
            <form
              css={css`
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 60px;
                width: 100%;
                max-width: 600px;
                text-align: center;
              `}
              onSubmit={handleSubmit}
            >
              <>
                <Title margin="0px" style={{ color: "#025f6d" }}>
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
                <Title
                  margin="10px 0"
                  fontSize="16px"
                  style={{ color: "#025f6d" }}
                >
                  This form will expire on:&nbsp;
                  <span style={{ color: "#f56342" }}>
                    <FormatDate
                      date={form.expirationDate}
                      format={dateTimeFormat}
                      style={{ display: "inline" }}
                    />
                  </span>
                </Title>
                {form.notes && <Notes notes={form.notes} />}
                <FieldGenerator fields={fields} onChange={handleChange} />
                <SubmitButton
                  isSubmitting={isSubmitting}
                  title="Submit AP Form"
                  style={{ width: "300px", margin: "0 auto" }}
                  submitBtnStyle={{
                    background: "#010404",
                    border: "2px solid #2e7c8a"
                  }}
                />
              </>
            </form>
          )}
        </Padding>
      </Card>
    </>
  );
};

export default APForm;
