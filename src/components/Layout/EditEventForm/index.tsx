import * as React from "react";
import get from "lodash.get";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import FormTitle from "~components/Forms/FormTitle";
import Card from "~components/Layout/Card";
import EventForm from "~components/Layout/EventForm";
import Padding from "~components/Layout/Padding";
import { FaEdit } from "~icons";
import { parseData } from "~utils/parseResponse";
import app from "~utils/axiosConfig";
import {
  AxiosResponse,
  ReactElement,
  TEventAPIQueryConfig,
  TEvent
} from "~types";

export type TEditSeasonFormState = {
  event: TEvent;
  isLoading: boolean;
};

export const EditEventForm = (): ReactElement => {
  const router = useRouter();
  const id = get(router, ["query", "id"]);
  const [state, setState] = React.useState<TEditSeasonFormState>({
    event: {} as TEvent,
    isLoading: true
  });
  const { isLoading, event } = state;

  const fetchEvent = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get(`events/edit/${id}`);
      const data = parseData<TEvent>(res);

      setState(prevState => ({
        ...prevState,
        event: data,
        isLoading: false
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      router.replace("/employee/events/viewall?page=1");
    }
  }, [app, id, parseData, router, toast]);

  const apiQuery = (config: TEventAPIQueryConfig): Promise<AxiosResponse> =>
    app.put("events/update", config);

  React.useEffect(() => {
    if (isLoading && id) fetchEvent();
  }, [isLoading, id, fetchEvent]);

  return (
    <Card
      dataTestId="edit-event-page"
      icon={<FaEdit />}
      title="Edit An Event"
      subtitle="Edit Event Form"
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Edit Event"
          title="Edit Event"
          description="Please fill out the fields below to edit and update an event."
        />
        <EventForm
          id={id as string}
          apiQuery={apiQuery}
          event={event}
          fetchingEventData={isLoading}
          submitText="Update"
        />
      </Padding>
    </Card>
  );
};

export default EditEventForm;
