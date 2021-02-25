import * as React from "react";
import isEmpty from "lodash.isempty";
// import get from "lodash.get";
import { css } from "@emotion/react";
import Card from "~components/Layout/Card";
import CalendarDateContainer from "~components/Layout/CalendarDateContainer";
import CalendarDateTitle from "~components/Layout/CalendarDateTitle";
import LoadingPanel from "~components/Layout/LoadingPanel";
// import NoEvents from "~components/Layout/NoEvents";
import { MdEvent } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { AxiosResponse, ReactNode, TEventData } from "~types";
import FetchError from "~components/Layout/FetchError";

export type TDashboardEventsState = {
  isLoading: boolean;
  isVisible: boolean;
  error: boolean;
  events: Array<TEventData>;
  modalChildren: ReactNode;
};

export const Events = (): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventsState>({
    error: false,
    events: [],
    isLoading: true,
    isVisible: false,
    modalChildren: null
  });

  const { error, events, isLoading } = state; // isVisible, modalChildren

  const fetchTodayEvents = React.useCallback(async () => {
    try {
      const res: AxiosResponse = await app.get("dashboard/events/today");
      const data = parseData(res);

      setState(prevState => ({
        ...prevState,
        isLoading: false,
        events: data.events
      }));
    } catch (err) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: true
      }));
    }
  }, []);

  React.useEffect(() => {
    fetchTodayEvents();
  }, [fetchTodayEvents]);

  return (
    <Card
      dataTestId="dashboard-events"
      icon={<MdEvent style={{ fontSize: "24px" }} />}
      title="Events"
    >
      <CalendarDateContainer>
        <CalendarDateTitle />
        {isLoading ? (
          <LoadingPanel
            style={{
              margin: "30px auto 0",
              maxWidth: "350px",
              width: "100%",
              borderRadius: 3
            }}
            height="140px"
          />
        ) : error ? (
          <FetchError />
        ) : (
          <div
            css={css`
              padding: 30px 20px;
            `}
          >
            {!isEmpty(events) ? (
              <pre>{JSON.stringify(events, null, 2)}</pre>
            ) : null}
          </div>
        )}
      </CalendarDateContainer>
    </Card>
  );
};

export default Events;

/*
events.map(props =>
											moment(props.eventDate) < endOfDay ? (
												<ScheduleList
													key={props._id}
													content={[props]}
													innerStyle={{
														padding: "5px 0",
														maxWidth: 225,
														margin: "0 auto",
													}}
													btnStyle={{ maxWidth: 585, minWidth: 225 }}
													spacing={20}
													padding="0"
													folder="lowres"
													handleShowModal={this.handleShowModal}
													loggedinUserId={this.props.loggedinUserId}
													scheduleIconStyle={{
														fontSize: 19,
														margin: "0 10px",
													}}
												/>
*/
