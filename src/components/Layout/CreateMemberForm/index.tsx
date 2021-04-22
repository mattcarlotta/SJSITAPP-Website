import * as React from "react";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import Card from "~components/Layout/Card";
import Form from "~components/Layout/Form";
import Padding from "~components/Layout/Padding";
import SubmitButton from "~components/Layout/SubmitButton";
import { FaUserPlus } from "~icons";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import app from "~utils/axiosConfig";
import { parseMessage } from "~utils/parseResponse";
import fields from "./Fields";
import { EventTarget, FormEvent } from "~types";

export type TCreateMemberFormFormState = {
  fields: typeof fields;
  errors: boolean;
  isSubmitting: boolean;
};

export const CreateMemberForm = (): JSX.Element => {
  const router = useRouter();
  const [state, setState] = React.useState<TCreateMemberFormFormState>({
    fields,
    errors: false,
    isSubmitting: false
  });
  const { errors, isSubmitting } = state;

  const createMember = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.post("tokens/create", parseFields(state.fields));
      const message = parseMessage(res);

      toast({ type: "success", message });

      router.push("/employee/authorizations/viewall?page=1");
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({
        ...prevState,
        isSubmitting: false
      }));
    }
  }, [app, parseFields, parseMessage, router, state.fields]);

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
    if (isSubmitting && !errors) createMember();
  }, [isSubmitting, errors, createMember]);

  return (
    <Card
      dataTestId="create-member-page"
      icon={<FaUserPlus />}
      title="Create Member"
      subtitle="Authorize Members"
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Create Member"
          title="Create Member"
          description="Please fill out the fields below to authorize a new member."
        />
        <Form onSubmit={handleSubmit}>
          <FieldGenerator fields={state.fields} onChange={handleChange} />
          <SubmitButton
            isSubmitting={state.isSubmitting}
            maxWidth="500px"
            title="Create Member"
          />
        </Form>
      </Padding>
    </Card>
  );
};

export default CreateMemberForm;
