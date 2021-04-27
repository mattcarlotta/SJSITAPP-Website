import * as React from "react";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Form from "~components/Layout/Form";
import AddField from "~components/Layout/AddField";
import LoadingPanel from "~components/Layout/LoadingPanel";
import SubmitButton from "~components/Layout/SubmitButton";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import app from "~utils/axiosConfig";
import { parseData, parseMessage } from "~utils/parseResponse";
import fields from "./Fields";
import {
  AxiosResponse,
  EventTarget,
  FormEvent,
  ReactElement,
  TEvent,
  TEventAPIQueryConfig
} from "~types";

export type TAPFormProps = {
  apiQuery: (config: TEventAPIQueryConfig) => Promise<AxiosResponse>;
  id?: string;
  event?: TEvent;
  fetchingEventData?: boolean;
  submitText: string;
};

export type TAPFormState = {
  fields: ReturnType<typeof fields>;
  errors: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
};

export type TAPParsedFields = {
  startMonth: string;
  endMonth: string;
  expirationDate: string;
};

const APForm = ({
  apiQuery,
  id,
  fetchingEventData,
  event,
  submitText
}: TAPFormProps): ReactElement => {
  const router = useRouter();
  const [state, setState] = React.useState<TAPFormState>({
    fields: [],
    errors: false,
    isLoading: true,
    isSubmitting: false
  });
  const { errors, isLoading, isSubmitting } = state;

  const handleRemoveField = (name: string): void => {
    setState(prevState => ({
      ...prevState,
      fields: prevState.fields.filter(field => field.name !== name)
    }));
  };

  const initializeFields = React.useCallback(async (): Promise<void> => {
    try {
      let res = await app.get("seasons/all/ids");
      const seasons = parseData<{ seasonIds: Array<string> }>(res);

      res = await app.get("teams/all");
      const teams = parseData<{ names: Array<string> }>(res);

      setState(prevState => ({
        ...prevState,
        fields: fields(
          seasons.seasonIds,
          teams.names,
          event,
          handleRemoveField
        ),
        isLoading: false
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      router.replace("/employee/events/viewall?page=1");
    }
  }, [app, fields, event, parseData, router, toast]);

  const saveEvent = React.useCallback(async (): Promise<void> => {
    try {
      const res = await apiQuery({
        id,
        ...parseFields<TEvent>(state.fields)
      });
      const message = parseMessage(res);

      toast({ type: "success", message });

      router.push("/employee/events/viewall?page=1");
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({
        ...prevState,
        isSubmitting: false
      }));
    }
  }, [app, id, parseFields, parseMessage, router, state, toast]);

  const handleChange = ({ target: { name, value } }: EventTarget): void => {
    setState(prevState => ({
      ...prevState,
      fields: fieldUpdater(prevState.fields, name, value)
    }));
  };

  const handleAddField = (): void => {
    setState(prevState => ({
      ...prevState,
      fields: [
        ...prevState.fields,
        {
          type: "calltime",
          name: `callTime-${Date.now()}`,
          label: "",
          value: null,
          errors: "",
          required: false,
          style: { width: "100%", marginBottom: 10 },
          onFieldRemove: handleRemoveField
        }
      ]
    }));
  };

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
    if (isSubmitting && !errors) saveEvent();
  }, [isSubmitting, errors, saveEvent]);

  React.useEffect(() => {
    if (!fetchingEventData && isLoading) initializeFields();
  }, [fetchingEventData, isLoading, initializeFields]);

  return isLoading ? (
    <LoadingPanel
      data-testid="loading-event-form"
      borderRadius="5px"
      height="1139px"
    />
  ) : (
    <Form data-testid="event-form" onSubmit={handleSubmit}>
      <FieldGenerator fields={state.fields} onChange={handleChange} />
      <AddField onClick={handleAddField} text="Add a call time slot..." />
      <SubmitButton
        isSubmitting={isSubmitting}
        maxWidth="500px"
        title={submitText}
      />
    </Form>
  );
};

export default APForm;
