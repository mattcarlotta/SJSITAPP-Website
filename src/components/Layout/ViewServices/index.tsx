import * as React from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash.isempty";
import toast from "~components/App/Toast";
import Form from "~components/Layout/Form";
import FormTitle from "~components/Forms/FormTitle";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Button from "~components/Layout/Button";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import SubmitButton from "~components/Layout/SubmitButton";
import OutsideLink from "~components/Navigation/OutsideLink";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { MdSettingsInputComponent } from "~icons";
import app from "~utils/axiosConfig";
import { parseData, parseMessage } from "~utils/parseResponse";
import fields from "./Fields";
import CurrentSettings from "./CurrentSettings";
import {
  AxiosResponse,
  EventTarget,
  FormEvent,
  ReactElement,
  TService
} from "~types";

export type TViewServiceState = {
  fields: ReturnType<typeof fields>;
  errors: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  service: TService;
  showForm: boolean;
};

export const ViewService = (): ReactElement => {
  const router = useRouter();
  const [state, setState] = React.useState<TViewServiceState>({
    fields: [],
    errors: false,
    isLoading: true,
    isSubmitting: false,
    service: {} as TService,
    showForm: false
  });
  const { errors, isLoading, isSubmitting, service, showForm } = state;

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
      router.replace("/employee/dashboard");
    }
  }, [app, parseData, router, toast]);

  const saveService = React.useCallback(async (): Promise<void> => {
    try {
      let res: AxiosResponse;
      if (!isEmpty(state.service))
        res = await app.put("service/update", {
          id: state.service._id,
          ...parseFields(state.fields)
        });
      else res = await app.post("service/create", parseFields(state.fields));

      const message = parseMessage(res);

      toast({ type: "success", message });

      setState(prevState => ({
        ...prevState,
        errors: false,
        isSubmitting: false,
        isLoading: true,
        showForm: false
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({
        ...prevState,
        isSubmitting: false
      }));
    }
  }, [
    app,
    isEmpty,
    parseFields,
    parseMessage,
    state.fields,
    state.service,
    toast
  ]);

  const handleChange = ({ target: { name, value } }: EventTarget): void => {
    setState(prevState => ({
      ...prevState,
      fields: fieldUpdater(prevState.fields, name, value)
    }));
  };

  const toggleForm = () => {
    setState(prevState => ({
      ...prevState,
      showForm: !prevState.showForm
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
  }, [isLoading, fetchService]);

  return (
    <Card
      dataTestId="automated-services-page"
      title="Services Settings"
      subtitle="Settings for the Email & Automated Services"
      icon={<MdSettingsInputComponent />}
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Services Settings"
          title="Email & Automated Service Settings"
          description="If changing settings, please fill out all of the fields and click the 'Save' button to update them."
        />
        <Center>
          <PanelDescription margin="5px 0 20px 0">
            Having trouble understanding the services? Click
            <OutsideLink
              dataTestId="help-automated-services-link"
              href="/employee/help#how-do-the-automated-services-work"
            >
              here
            </OutsideLink>
            for help.
          </PanelDescription>
        </Center>
        {isLoading ? (
          <LoadingPanel
            data-testid="loading-service-form"
            borderRadius="5px"
            height="829px"
          />
        ) : !showForm ? (
          <CurrentSettings {...service} toggleForm={toggleForm} />
        ) : (
          <Form
            data-testid="services-settings-form"
            onSubmit={handleSubmit}
            style={{
              background: "#ebebeb",
              border: "1px solid #888",
              borderRadius: "5px",
              padding: "10px"
            }}
          >
            <FieldGenerator fields={state.fields} onChange={handleChange} />
            <Button
              dataTestId="cancel-form"
              danger
              margin="0 0 10px 0"
              padding="10.5px 18px"
              type="button"
              onClick={toggleForm}
            >
              Cancel
            </Button>
            <SubmitButton
              isSubmitting={isSubmitting}
              maxWidth="500px"
              title="Save Settings"
            />
          </Form>
        )}
      </Padding>
    </Card>
  );
};

export default ViewService;
