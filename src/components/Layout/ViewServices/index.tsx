import * as React from "react";
import get from "lodash.get";
import toast from "~components/App/Toast";
import Form from "~components/Layout/Form";
import FormTitle from "~components/Forms/FormTitle";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Card from "~components/Layout/Card";
import Padding from "~components/Layout/Padding";
import LoadingPanel from "~components/Layout/LoadingPanel";
import SubmitButton from "~components/Layout/SubmitButton";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { MdSettingsInputComponent } from "~icons";
import app from "~utils/axiosConfig";
import { parseData, parseMessage } from "~utils/parseResponse";
import fields from "./Fields";
import {
  AxiosResponse,
  EventTarget,
  FormEvent,
  ReactElement,
  TService
} from "~types"; //

export type TViewServiceState = {
  fields: ReturnType<typeof fields>;
  errors: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  service: TService;
};

export const ViewService = (): ReactElement => {
  const [state, setState] = React.useState<TViewServiceState>({
    fields: [],
    errors: false,
    isLoading: true,
    isSubmitting: false,
    service: {} as TService
  });
  const { errors, isLoading, isSubmitting } = state;

  const fetchService = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get("service/view");
      const data = parseData<TService>(res);

      setState(prevState => ({
        ...prevState,
        fields: fields(data),
        service: data,
        isLoading: false
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({
        ...prevState,
        isLoading: false
      }));
    }
  }, []);

  const saveService = React.useCallback(async (): Promise<void> => {
    try {
      const id = get(state.service, ["_id"]);
      let res: AxiosResponse;

      if (id)
        res = await app.put("service/update", {
          id,
          ...parseFields(state.fields)
        });
      else res = await app.post("service/create", parseFields(state.fields));

      const message = parseMessage(res);

      toast({ type: "success", message });

      setState(prevState => ({
        ...prevState,
        errors: false,
        isSubmitting: false,
        isLoading: true
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({
        ...prevState,
        isSubmitting: false
      }));
    }
  }, [app, parseFields, parseMessage, state.fields, state.service]);

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
    if (isSubmitting && !errors) saveService();
  }, [isSubmitting, errors, saveService]);

  React.useEffect(() => {
    if (isLoading) fetchService();
  }, [isLoading]);

  return (
    <Card
      dataTestId="automated-services-page"
      title="Automated Services"
      subtitle="Settings for the Automated Services"
      icon={<MdSettingsInputComponent />}
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Automated Services"
          title="Automated Service Settings"
          description="Please fill out all the fields below to save and update the automated service settings."
        />
        {isLoading ? (
          <LoadingPanel
            data-testid="loading-service-form"
            borderRadius="5px"
            height="1287px"
          />
        ) : (
          <Form data-testid="service-form" onSubmit={handleSubmit}>
            <FieldGenerator fields={state.fields} onChange={handleChange} />
            <SubmitButton
              isSubmitting={isSubmitting}
              maxWidth="500px"
              title="Save"
            />
          </Form>
        )}
      </Padding>
    </Card>
  );
};

export default ViewService;
