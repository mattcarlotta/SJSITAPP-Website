import * as React from "react";
import FormTitle from "~components/Forms/FormTitle";
import Card from "~components/Layout/Card";
import EventForm from "~components/Layout/EventForm";
import Padding from "~components/Layout/Padding";
import { MdNoteAdd } from "~icons";
import app from "~utils/axiosConfig";
import { AxiosResponse, ReactElement, TEventAPIQueryConfig } from "~types";

export const CreateEventForm = (): ReactElement => {
  const apiQuery = (config: TEventAPIQueryConfig): Promise<AxiosResponse> =>
    app.post("events/create", config);

  return (
    <Card
      dataTestId="create-event-page"
      icon={<MdNoteAdd />}
      title="Add A New Event"
      subtitle="Create Event Form"
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Create Event"
          title="New Event"
          description="Please fill out the fields below to create an event."
        />
        <EventForm apiQuery={apiQuery} submitText="Create" />
      </Padding>
    </Card>
  );
};

export default CreateEventForm;
