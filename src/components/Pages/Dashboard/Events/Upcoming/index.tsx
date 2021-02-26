import * as React from "react";
import isEmpty from "lodash.isempty";
// import get from "lodash.get";
import CalendarDateContainer from "~components/Layout/CalendarDateContainer";
import CalendarDateTitle from "~components/Layout/CalendarDateTitle";
import FetchError from "~components/Layout/FetchError";
import LoadingPanel from "~components/Layout/LoadingPanel";
import NoEvents from "~components/Layout/NoEvents";
import { TEventData } from "~types";

export type TEventsTodayProps = {
  error: boolean;
  events: Array<TEventData>;
  fetchEvents: (tab: string) => Promise<void>;
  isLoading: boolean;
};

const EventsUpcoming = ({
  error,
  events,
  fetchEvents,
  isLoading
}: TEventsTodayProps): JSX.Element => {
  React.useEffect(() => {
    fetchEvents("upcoming");
  }, [fetchEvents]);

  return (
    <CalendarDateContainer>
      <CalendarDateTitle nextWeek />
      {isLoading ? (
        <LoadingPanel
          borderRadius="3px"
          height="170px"
          margin="10px auto 0"
          maxWidth="350px"
        />
      ) : error ? (
        <FetchError />
      ) : !isEmpty(events) ? (
        <pre>{JSON.stringify(events, null, 2)}</pre>
      ) : (
        <NoEvents />
      )}
    </CalendarDateContainer>
  );
};

export default EventsUpcoming;
