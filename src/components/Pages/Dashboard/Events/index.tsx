import * as React from "react";
import isEmpty from "lodash.isempty";
import { connect } from "react-redux";
import Card from "~components/Layout/Card";
import CalendarDateContainer from "~components/Layout/CalendarDateContainer";
import CalendarDateTitle from "~components/Layout/CalendarDateTitle";
import Event from "~components/Layout/Event";
import FetchError from "~components/Layout/FetchError";
import LoadingPanel from "~components/Layout/LoadingPanel";
import NoEvents from "~components/Layout/NoEvents";
import TabPanel, { a11yProps } from "~components/Layout/TabPanel";
import Tab from "~components/Layout/Tab";
import Tabs from "~components/Layout/Tabs";
import { MdEvent } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { AxiosResponse, TEventData, TRootState } from "~types";

export type TDashboardEventsState = {
  isLoading: boolean;
  error: boolean;
  events: Array<TEventData>;
  nextWeek: boolean;
  tab: number;
};

export type TDashboardEventsProps = {
  loggedinUserId: string;
};

export const Events = ({
  loggedinUserId
}: TDashboardEventsProps): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventsState>({
    error: false,
    events: [],
    isLoading: true,
    nextWeek: false,
    tab: 0
  });

  const handleTabChange = React.useCallback((_, tab: number): void => {
    setState(prevState => ({
      ...prevState,
      isLoading: true,
      error: false,
      events: [],
      nextWeek: tab !== 0,
      tab
    }));
  }, []);

  const { error, events, isLoading, nextWeek } = state;

  const fetchEvents = React.useCallback(async (tab: string): Promise<void> => {
    try {
      const res: AxiosResponse = await app.get(`dashboard/events/${tab}`);
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
    fetchEvents(!nextWeek ? "today" : "upcoming");
  }, [nextWeek, fetchEvents]);

  return (
    <Card
      dataTestId="dashboard-events"
      icon={<MdEvent style={{ fontSize: "24px" }} />}
      title="Events"
      padding="0"
    >
      <Tabs
        value={state.tab}
        onChange={handleTabChange}
        variant="standard"
        aria-label="event tabs"
      >
        <Tab disabled={state.tab === 0} label="Today" {...a11yProps(0)} />
        <Tab disabled={state.tab === 1} label="Upcoming" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={0} index={0}>
        <CalendarDateContainer>
          <CalendarDateTitle nextWeek={nextWeek} />
          {isLoading ? (
            <LoadingPanel
              borderRadius="3px"
              height="170px"
              margin="10px auto 0"
            />
          ) : error ? (
            <FetchError />
          ) : !isEmpty(events) ? (
            events.map(props => (
              <Event
                key={props._id}
                padding="5px 20px"
                details={[props]}
                spacing={20}
                folder="lowres"
                loggedinUserId={loggedinUserId}
              />
            ))
          ) : (
            <NoEvents today={!state.nextWeek} />
          )}
        </CalendarDateContainer>
      </TabPanel>
    </Card>
  );
};

const mapStateToProps = ({ auth }: Pick<TRootState, "auth">) => ({
  loggedinUserId: auth.id
});

export default connect(mapStateToProps)(Events);
