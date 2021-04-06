import * as React from "react";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Input from "~components/Forms/Input";
import FormTitle from "~components/Forms/FormTitle";
import Card from "~components/Layout/Card";
import Form from "~components/Layout/Form";
import Padding from "~components/Layout/Padding";
import SubmitButton from "~components/Layout/SubmitButton";
import { FaFolderPlus } from "~icons";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import app from "~utils/axiosConfig";
import { parseMessage } from "~utils/parseResponse";
import { fullyearFormat } from "~utils/dateFormats";
import moment from "~utils/momentWithTimezone";
import fields from "./Fields";
import { EventTarget, FormEvent } from "~types";

export type TCreateSeasonFormState = {
  fields: typeof fields;
  errors: boolean;
  isSubmitting: boolean;
  seasonId: Array<string>;
};

export type TCreateSeasonParsedFields = {
  startDate: string;
  endDate: string;
};

export const CreateSeasonForm = (): JSX.Element => {
  const router = useRouter();
  const [state, setState] = React.useState<TCreateSeasonFormState>({
    fields,
    errors: false,
    isSubmitting: false,
    seasonId: ["", ""]
  });
  const { errors, seasonId, isSubmitting } = state;
  const [startDate, endDate] = seasonId;
  const hasSeasonId = startDate && endDate;

  const createSeason = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.post("season/create", {
        seasonId: state.seasonId.join(""),
        ...parseFields<TCreateSeasonParsedFields>(state.fields)
      });
      const message = parseMessage(res);

      toast({ type: "success", message });

      router.push("/employee/seasons/viewall?page=1");
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({
        ...prevState,
        isSubmitting: false
      }));
    }
  }, [app, parseFields, parseMessage, router, state, toast]);

  const handleChange = ({ target: { name, value } }: EventTarget): void => {
    setState(prevState => {
      const seasonId = prevState.seasonId;
      const isStart = name === "startDate";
      const nextValue = moment(value as string)[isStart ? "startOf" : "endOf"](
        "day"
      );
      seasonId[isStart ? 0 : 1] = nextValue.format(fullyearFormat);

      return {
        ...prevState,
        fields: fieldUpdater(prevState.fields, name, nextValue),
        seasonId
      };
    });
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
    if (isSubmitting && !errors) createSeason();
  }, [isSubmitting, errors]);

  return (
    <Card
      dataTestId="create-season-page"
      icon={<FaFolderPlus />}
      title="Add A New Season"
      subtitle="Create Season Form"
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Create Season"
          title="New Season"
          description="Please select a start and end date to create a new season."
        />
        <Form onSubmit={handleSubmit}>
          <Input
            disabled
            type="text"
            name="seasonId"
            label="Season Id"
            errors={errors && !hasSeasonId ? "Required." : ""}
            value={hasSeasonId ? `${startDate} - ${endDate}` : ""}
            tooltip="Select a season start and end date to automatically fill in this field."
            placeholder="Start Date - End Date"
            inputStyle={{ textAlign: "center", color: "rgba(0, 0, 0, 0.87)" }}
          />
          <FieldGenerator fields={state.fields} onChange={handleChange} />
          <SubmitButton
            isSubmitting={state.isSubmitting}
            maxWidth="500px"
            title="Create"
          />
        </Form>
      </Padding>
    </Card>
  );
};

export default CreateSeasonForm;
