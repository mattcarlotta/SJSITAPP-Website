import * as React from "react";
import Card from "~components/Layout/Card";
import TabPanel, { a11yProps } from "~components/Layout/TabPanel";
import Tab from "~components/Layout/Tab";
import Tabs from "~components/Layout/Tabs";
// import NoEvents from "~components/Layout/NoEvents";
import { MdEvent } from "~icons";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import EventsToday from "./Today";
import EventsUpcoming from "./Upcoming";
import { AxiosResponse, ReactNode, TEventData } from "~types";

export type TDashboardEventsState = {
  isLoading: boolean;
  isVisible: boolean;
  error: boolean;
  events: Array<TEventData>;
  modalChildren: ReactNode;
  tab: number;
};

export const Events = (): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventsState>({
    error: false,
    events: [],
    isLoading: true,
    isVisible: false,
    modalChildren: null,
    tab: 0
  });

  const { tab } = state; // isVisible, modalChildren

  const handleTabChange = React.useCallback((_, tab: number): void => {
    setState(prevState => ({
      ...prevState,
      isLoading: true,
      errors: false,
      events: [],
      tab
    }));
  }, []);

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

  return (
    <Card
      dataTestId="dashboard-events"
      icon={<MdEvent style={{ fontSize: "24px" }} />}
      title="Events"
      padding="0"
    >
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="standard"
        aria-label="event tabs"
      >
        <Tab label="Today" {...a11yProps(0)} />
        <Tab label="Upcoming" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <EventsToday {...state} fetchEvents={fetchEvents} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <EventsUpcoming {...state} fetchEvents={fetchEvents} />
      </TabPanel>
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
