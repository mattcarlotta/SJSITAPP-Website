import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import FormTitle from "~components/Forms/FormTitle";
import Card from "~components/Layout/Card";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import SeasonForm from "~components/Layout/SeasonForm";
import { FaEdit } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import {
  AxiosResponse,
  ReactElement,
  TSeasonAPIQueryConfig,
  TSeasonData
} from "~types";

export type TEditSeasonFormState = {
  season: TSeasonData;
  isLoading: boolean;
};

export const EditSeasonForm = (): ReactElement => {
  const router = useRouter();
  const id = get(router, ["query", "id"]);
  const [state, setState] = React.useState<TEditSeasonFormState>({
    isLoading: true,
    season: {} as TSeasonData
  });
  const { isLoading, season } = state;

  const fetchSeason = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get(`seasons/edit/${id}`);
      const data = parseData<TSeasonData>(res);

      setState(prevState => ({
        ...prevState,
        season: data,
        isLoading: false
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      router.replace("/employee/seasons/viewall?page=1");
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [id]);

  const apiQuery = React.useCallback(
    (config: TSeasonAPIQueryConfig): Promise<AxiosResponse> =>
      app.put("seasons/update", config),
    []
  );

  React.useEffect(() => {
    if (isLoading && id) fetchSeason();
  }, [isLoading, id, fetchSeason]);

  return (
    <Card
      dataTestId="edit-season-page"
      icon={<FaEdit />}
      title="Edit Season"
      subtitle="Update Selected Season"
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Edit Season"
          title="Edit Season"
          description="Please edit the start and end date to update the season."
        />
        {isLoading ? (
          <LoadingPanel
            data-testid="loading-season"
            borderRadius="5px"
            height="342px"
          />
        ) : (
          <SeasonForm
            apiQuery={apiQuery}
            id={id as string}
            season={season}
            submitText="Update"
          />
        )}
      </Padding>
    </Card>
  );
};

export default EditSeasonForm;
