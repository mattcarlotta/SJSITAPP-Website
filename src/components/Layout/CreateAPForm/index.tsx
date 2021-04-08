import * as React from "react";
import FormTitle from "~components/Forms/FormTitle";
import APForm from "~components/Layout/APForm";
import Card from "~components/Layout/Card";
import Padding from "~components/Layout/Padding";
import { FaFolderPlus } from "~icons";
import app from "~utils/axiosConfig";
import { AxiosResponse, TFormAPIQueryConfig } from "~types";

export const CreateAPForm = (): JSX.Element => {
  const apiQuery = (config: TFormAPIQueryConfig): Promise<AxiosResponse> =>
    app.post("forms/create", config);

  return (
    <Card
      dataTestId="create-form-page"
      icon={<FaFolderPlus />}
      title="Add A New AP Form"
      subtitle="Create AP Form"
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Create AP Form"
          title="New AP Form"
          description="Please fill out all the fields below to create a new AP form."
        />
        <APForm apiQuery={apiQuery} submitText="Create" />
      </Padding>
    </Card>
  );
};

export default CreateAPForm;
