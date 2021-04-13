import * as React from "react";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Form from "~components/Layout/Form";
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
  TForm,
  TFormAPIQueryConfig
} from "~types";

export type TAPFormProps = {
  apiQuery: (config: TFormAPIQueryConfig) => Promise<AxiosResponse>;
  id?: string;
  fetchingFormData?: boolean;
  form?: TForm;
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
  fetchingFormData,
  form,
  submitText
}: TAPFormProps): JSX.Element => {
  const router = useRouter();
  const [state, setState] = React.useState<TAPFormState>({
    fields: [],
    errors: false,
    isLoading: true,
    isSubmitting: false
  });
  const { errors, isLoading, isSubmitting } = state;

  const initializeFields = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get("seasons/all/ids");
      const data = parseData<{ seasonIds: Array<string> }>(res);

      setState(prevState => ({
        ...prevState,
        fields: fields(data.seasonIds, form),
        isLoading: false
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      router.replace("/employee/forms/viewall?page=1");
    }
  }, [app, fields, form, parseData, router, toast]);

  const saveForm = React.useCallback(async (): Promise<void> => {
    try {
      const res = await apiQuery({
        id,
        ...parseFields<TForm>(state.fields)
      });
      const message = parseMessage(res);

      toast({ type: "success", message });

      router.push("/employee/forms/viewall?page=1");
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
    if (isSubmitting && !errors) saveForm();
  }, [isSubmitting, errors, saveForm]);

  React.useEffect(() => {
    if (!fetchingFormData && isLoading) initializeFields();
  }, [fetchingFormData, isLoading, initializeFields]);

  return isLoading ? (
    <LoadingPanel
      data-testid="loading-form"
      borderRadius="5px"
      height="817px"
    />
  ) : (
    <Form data-testid="ap-form" onSubmit={handleSubmit}>
      <FieldGenerator fields={state.fields} onChange={handleChange} />
      <SubmitButton
        isSubmitting={isSubmitting}
        maxWidth="500px"
        title={submitText}
      />
    </Form>
  );
};

export default APForm;
