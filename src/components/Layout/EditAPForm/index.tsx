import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import APForm from "~components/Layout/APForm";
import FormTitle from "~components/Forms/FormTitle";
import Card from "~components/Layout/Card";
import Padding from "~components/Layout/Padding";
import { FaEdit } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import {
  AxiosResponse,
  ReactElement,
  TForm,
  TFormAPIQueryConfig
} from "~types";

export type TEditAPFormState = {
  form: TForm;
  isLoading: boolean;
};

export const EditAPForm = (): ReactElement => {
  const router = useRouter();
  const id = get(router, ["query", "id"]);
  const [state, setState] = React.useState<TEditAPFormState>({
    isLoading: true,
    form: {} as TForm
  });
  const { isLoading, form } = state;

  const fetchSeason = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get(`forms/edit/${id}`);
      const data = parseData<TForm>(res);

      setState(prevState => ({
        ...prevState,
        form: data,
        isLoading: false
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      router.replace("/employee/forms/viewall?page=1");
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [id]);

  const apiQuery = React.useCallback(
    (config: TFormAPIQueryConfig): Promise<AxiosResponse> =>
      app.put("forms/update", config),
    []
  );

  React.useEffect(() => {
    if (isLoading && id) fetchSeason();
  }, [isLoading, id, fetchSeason]);

  return (
    <Card
      dataTestId="edit-apform-page"
      icon={<FaEdit />}
      title="Edit AP Form"
      subtitle="Update Selected AP Form"
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Edit AP Form"
          title="Edit AP Form"
          description="Please edit all the required fields to update the season."
        />
        <APForm
          apiQuery={apiQuery}
          id={id as string}
          form={form}
          fetchingFormData={isLoading}
          submitText="Update"
        />
      </Padding>
    </Card>
  );
};

export default EditAPForm;
