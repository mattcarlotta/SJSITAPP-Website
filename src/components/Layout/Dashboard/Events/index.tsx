import * as React from "react";
import Card from "~components/Layout/Card";
import CalendarDateContainer from "~components/Layout/CalendarDateContainer";
import CalendarDateTitle from "~components/Layout/CalendarDateTitle";
import DisplayEvents from "~components/Layout/DisplayEvents";
import FetchError from "~components/Layout/FetchError";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Padding from "~components/Layout/Padding";
import TabPanel, { a11yProps } from "~components/Layout/TabPanel";
import Tab from "~components/Layout/Tab";
import Tabs from "~components/Layout/Tabs";
import { MdEvent } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { TEventData } from "~types";

export type TDashboardEventsState = {
  activeTab: string;
  error: boolean;
  events: Array<TEventData>;
  isLoading: boolean;
  tab: number;
};

export type TDashboardEventsProps = {
  loggedinUserId: string;
};

const initialState = {
  activeTab: "today",
  error: false,
  events: [],
  isLoading: true,
  tab: 0
};

export const Events = ({
  loggedinUserId
}: TDashboardEventsProps): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventsState>(initialState);
  const { activeTab, error, events, isLoading } = state;
  const nextWeek = activeTab !== "today";

  const handleTabChange = React.useCallback((_, tab: number): void => {
    setState(prevState => ({
      ...prevState,
      activeTab: tab === 0 ? "today" : "upcoming",
      error: false,
      events: [],
      isLoading: true,
      tab
    }));
  }, []);

  const fetchEvents = React.useCallback(async (tab: string): Promise<void> => {
    try {
      const res = await app.get(`dashboard/events/${tab}`);
      const data = parseData<Array<TEventData>>(res);

      setState(prevState => ({
        ...prevState,
        error: false,
        events: data,
        isLoading: false
      }));
    } catch (err) {
      setState(prevState => ({
        ...prevState,
        error: true,
        isLoading: false
      }));
    }
  }, []);

  const handleReload = React.useCallback(() => {
    setState(prevState => ({
      ...prevState,
      error: false,
      events: [],
      isLoading: true
    }));
  }, []);

  React.useEffect(() => {
    if (isLoading) fetchEvents(activeTab);
  }, [activeTab, isLoading]);

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
        <Tab disabled={state.tab === 0} label="today" {...a11yProps(0)} />
        <Tab disabled={state.tab === 1} label="upcoming" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={0} index={0}>
        <Padding top="10px" left="10px" right="10px">
          <CalendarDateContainer>
            <CalendarDateTitle nextWeek={nextWeek} />
            {isLoading ? (
              <LoadingPanel
                data-testid="loading-events"
                borderRadius="3px"
                height="175px"
                margin="10px auto 0"
              />
            ) : error ? (
              <FetchError onClickReload={handleReload} />
            ) : (
              <DisplayEvents
                events={events}
                nextWeek={nextWeek}
                spacing={20}
                folder="lowres"
                loggedinUserId={loggedinUserId}
              />
            )}
          </CalendarDateContainer>
        </Padding>
      </TabPanel>
    </Card>
  );
};

export default Events;
