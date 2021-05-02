import * as React from "react";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import FieldGenerator from "~components/Forms/FieldGenerator";
import Input from "~components/Forms/Input";
import Form from "~components/Layout/Form";
import SubmitButton from "~components/Layout/SubmitButton";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { parseMessage } from "~utils/parseResponse";
import { fullyearFormat } from "~utils/dateFormats";
import moment from "~utils/momentWithTimezone";
import fields from "./Fields";
import {
  AxiosResponse,
  EventTarget,
  FormEvent,
  ReactElement,
  TSeasonAPIQueryConfig,
  TSeasonData
} from "~types";

export type TSeasonFormProps = {
  apiQuery: (config: TSeasonAPIQueryConfig) => Promise<AxiosResponse>;
  id?: string;
  season?: TSeasonData;
  submitText: string;
};

export type TSeasonFormState = {
  fields: ReturnType<typeof fields>;
  errors: boolean;
  isSubmitting: boolean;
  seasonId: Array<string>;
};

export type TSeasonParsedFields = {
  startDate: string;
  endDate: string;
};

const SeasonForm = ({
  apiQuery,
  id,
  season,
  submitText
}: TSeasonFormProps): ReactElement => {
  const router = useRouter();
  const [state, setState] = React.useState<TSeasonFormState>({
    fields: fields(season),
    errors: false,
    isSubmitting: false,
    seasonId: !isEmpty(season)
      ? [
          moment((season as TSeasonData).startDate).format(fullyearFormat),
          moment((season as TSeasonData).endDate).format(fullyearFormat)
        ]
      : ["", ""]
  });
  const { errors, seasonId, isSubmitting } = state;
  const [startDate, endDate] = seasonId;
  const hasSeasonId = Boolean(startDate && endDate);

  const saveSeason = React.useCallback(async (): Promise<void> => {
    try {
      const res = await apiQuery({
        id,
        seasonId: state.seasonId.join(""),
        ...parseFields<TSeasonParsedFields>(state.fields)
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
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [apiQuery, id, state.seasonId, state.fields]);

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
    if (isSubmitting && !errors) saveSeason();
  }, [isSubmitting, errors, saveSeason]);

  return (
    <Form data-testid="season-form" onSubmit={handleSubmit}>
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
        isSubmitting={isSubmitting}
        maxWidth="500px"
        title={submitText}
      />
    </Form>
  );
};

export default SeasonForm;
