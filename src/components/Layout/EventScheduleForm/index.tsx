import * as React from "react";
import { useRouter } from "next/router";
import get from "lodash.get";
import toast from "~components/App/Toast";
import Form from "~components/Layout/Form";
import FormTitle from "~components/Forms/FormTitle";
import Card from "~components/Layout/Card";
import Padding from "~components/Layout/Padding";
import LoadingPanel from "~components/Layout/LoadingPanel";
import SubmitButton from "~components/Layout/SubmitButton";
import { FaClipboardCheck } from "~icons";
import app from "~utils/axiosConfig";
import { parseData, parseMessage } from "~utils/parseResponse";
import EventDistributionOverlay from "./EventDistributionOverlay";
import ScheduleColumns from "./ScheduleColumns";
import {
  FormEvent,
  ReactElement,
  TEvent,
  TEventColumn,
  TEventColumns,
  TEventUsers,
  TEventSchedule,
  TEventScheduleUserDrop
} from "~types";

export type TEventScheduleFormState = {
  columns: TEventColumns;
  event: TEvent;
  users: TEventUsers;
  isLoading: boolean;
  isSubmitting: boolean;
};

const EventScheduleForm = (): ReactElement => {
  const router = useRouter();
  const id = get(router, ["query", "id"]);
  const [state, setState] = React.useState<TEventScheduleFormState>({
    event: {} as TEvent,
    users: {} as TEventUsers,
    columns: {} as TEventColumns,
    isLoading: true,
    isSubmitting: false
  });
  const { columns, isLoading, isSubmitting } = state;

  const initializeFields = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.get(`events/review/${id}`);
      const scheduleData = parseData<TEventSchedule>(res);

      setState(prevState => ({
        ...prevState,
        ...scheduleData,
        isLoading: false
      }));
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      router.replace("/employee/events/viewall?page=1");
    }
  }, [app, id, parseData, router, toast]);

  const saveSchedule = React.useCallback(async (): Promise<void> => {
    try {
      const res = await app.put("events/update/schedule", {
        id,
        schedule: columns.filter(column => column._id !== "employees")
      });
      const message = parseMessage(res);

      toast({ type: "success", message });

      router.back();
    } catch (err) {
      toast({ type: "error", message: err.toString() });
      setState(prevState => ({
        ...prevState,
        isSubmitting: false
      }));
    }
  }, [app, columns, id, parseMessage, router, toast]);

  const handleDragEnd = ({
    source,
    destination,
    draggableId
  }: TEventScheduleUserDrop): void => {
    // dropped inside of the list
    if (source && destination) {
      setState(prevState => {
        // source container index and id
        const { index: sourceIndex, droppableId: sourceId } = source;

        // destination container index and id
        const {
          index: destinationIndex,
          droppableId: destinationId
        } = destination;

        // source container object
        const sourceContainer = prevState.columns.find(
          column => column._id === sourceId
        ) as TEventColumn;

        // desination container object
        const destinationContainer = prevState.columns.find(
          column => column._id === destinationId
        ) as TEventColumn;

        // source container "employeeIds" array
        const sourceIds = Array.from(sourceContainer.employeeIds);

        // destination container "employeeIds" array
        const destinationIds = Array.from(destinationContainer.employeeIds);

        // check if source and destination container are the same
        const isSameContainer =
          sourceContainer._id === destinationContainer._id;

        //  remove a userId from the source "employeeIds" array via the sourceIndex
        sourceIds.splice(sourceIndex, 1);

        // add a userId (draggableId) to the source or destination "employeeIds" array
        if (isSameContainer) {
          sourceIds.splice(destinationIndex, 0, draggableId as string);
        } else {
          destinationIds.splice(destinationIndex, 0, draggableId as string);
        }

        // update the source container with changed sourceIds
        const newSourceContainer = {
          ...sourceContainer,
          employeeIds: sourceIds
        };

        // update the destination container with changed destinationIds
        const newDestinationContainer = {
          ...destinationContainer,
          employeeIds: destinationIds
        };

        // loop through current columns and update the source
        // and destination containers
        const columns = prevState.columns.map(column => {
          if (column._id === newSourceContainer._id) {
            return newSourceContainer;
          }

          if (column._id === newDestinationContainer._id && !isSameContainer) {
            return newDestinationContainer;
          }

          return column;
        });

        return {
          ...prevState,
          columns
        };
      });
    }
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    setState(prevState => ({
      ...prevState,
      isSubmitting: true
    }));
  };

  React.useEffect(() => {
    if (isSubmitting) saveSchedule();
  }, [isSubmitting, saveSchedule]);

  React.useEffect(() => {
    if (isLoading && id) initializeFields();
  }, [isLoading, id, initializeFields]);

  return (
    <Card
      dataTestId="schedule-event-page"
      icon={<FaClipboardCheck />}
      title="Schedule Event"
      subtitle="Assign Employees to an Event"
    >
      <Padding top="20px" left="50px" right="50px" bottom="50px">
        <FormTitle
          header="Schedule Event"
          title="Schedule Event"
          description="Drag and drop members from the 'EMPLOYEES' column to any call time slot to schedule the event."
        />
        {isLoading ? (
          <LoadingPanel
            data-testid="loading-schedule-event-form"
            borderRadius="5px"
            height="1200px"
          />
        ) : (
          <>
            <EventDistributionOverlay id={id as string} />
            <Form
              data-testid="schedule-event-form"
              maxWidth="none"
              onSubmit={handleSubmit}
            >
              <ScheduleColumns {...state} handleDrag={handleDragEnd} />
              <SubmitButton
                isSubmitting={isSubmitting}
                maxWidth="500px"
                title="Save Schedule"
              />
            </Form>
          </>
        )}
      </Padding>
    </Card>
  );
};

export default EventScheduleForm;
