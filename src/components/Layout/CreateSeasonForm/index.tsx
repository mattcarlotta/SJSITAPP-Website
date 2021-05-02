import * as React from "react";
import FormTitle from "~components/Forms/FormTitle";
import Card from "~components/Layout/Card";
import Padding from "~components/Layout/Padding";
import SeasonForm from "~components/Layout/SeasonForm";
import { FaFolderPlus } from "~icons";
import app from "~utils/axiosConfig";
import { AxiosResponse, ReactElement, TSeasonAPIQueryConfig } from "~types";

export const CreateSeasonForm = (): ReactElement => {
  const apiQuery = React.useCallback(
    (config: TSeasonAPIQueryConfig): Promise<AxiosResponse> =>
      app.post("seasons/create", config),
    []
  );

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
        <SeasonForm apiQuery={apiQuery} submitText="Create" />
      </Padding>
    </Card>
  );
};

export default CreateSeasonForm;
