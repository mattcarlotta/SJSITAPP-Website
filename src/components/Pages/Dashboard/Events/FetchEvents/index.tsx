import * as React from "react";
import isEmpty from "lodash.isempty";
import { connect } from "react-redux";
import CalendarDateContainer from "~components/Layout/CalendarDateContainer";
import CalendarDateTitle from "~components/Layout/CalendarDateTitle";
import FetchError from "~components/Layout/FetchError";
import Event from "~components/Layout/Event";
import LoadingPanel from "~components/Layout/LoadingPanel";
import NoEvents from "~components/Layout/NoEvents";
import { TEventData, TRootState } from "~types";

export type TFetchEventsProps = {
  error: boolean;
  events: Array<TEventData>;
  fetchEvents: (tab: string) => Promise<void>;
  isLoading: boolean;
  loggedinUserId: string;
  nextWeek?: boolean;
};

export const FetchEvents = ({
  error,
  events,
  fetchEvents,
  isLoading,
  loggedinUserId,
  nextWeek
}: TFetchEventsProps): JSX.Element => {
  React.useEffect(() => {
    fetchEvents(!nextWeek ? "today" : "upcoming");
  }, [nextWeek, fetchEvents]);

  return (
    <CalendarDateContainer>
      <CalendarDateTitle nextWeek={nextWeek} />
      {isLoading ? (
        <LoadingPanel borderRadius="3px" height="170px" margin="10px auto 0" />
      ) : error ? (
        <FetchError />
      ) : !isEmpty(events) ? (
        events.map(props => (
          <Event
            key={props._id}
            padding="5px 20px"
            content={[props]}
            spacing={20}
            folder="lowres"
            loggedinUserId={loggedinUserId}
          />
        ))
      ) : (
        <NoEvents today={!nextWeek} />
      )}
    </CalendarDateContainer>
  );
};

const mapStateToProps = ({ auth }: Pick<TRootState, "auth">) => ({
  loggedinUserId: auth.id
});

export default connect(mapStateToProps)(FetchEvents);

/*
  events.map(props =>
          moment(props.eventDate) < endOfDay ? (
            <Event
              key={props._id}
              padding="5px 20px"
              content={[props]}
              spacing={20}
              folder="lowres"
              loggedinUserId={loggedinUserId}
              scheduleIconStyle={{
                fontSize: 19,
                margin: "0 10px"
              }}
            />
          ) : null
*/
