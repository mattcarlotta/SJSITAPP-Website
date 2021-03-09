import * as React from "react";
import APFormTitle from "~components/Layout/APFormTitle";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import DatePicker from "~components/Forms/DatePicker";
import EventDistributionChart from "~components/Layout/EventDistributionChart";
import FetchError from "~components/Layout/FetchError";
import FlexCenter from "~components/Layout/FlexCenter";
import LoadingPanel from "~components/Layout/LoadingPanel";
import Margin from "~components/Layout/Margin";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import { FaChartBar } from "~icons";
import moment from "~utils/momentWithTimezone";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { MaterialUiPickersDate, TEventDistributionData } from "~types";

export type TDashboardEventDistributionState = {
  endDate: string;
  error: boolean;
  events: Array<TEventDistributionData>;
  isLoading: boolean;
  startDate: string;
};

export const format = "YYYY-MM-DDTHH:mm:ssZ";

export const EventDistribution = (): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventDistributionState>({
    endDate: moment().endOf("month").format(format),
    error: false,
    events: [],
    isLoading: true,
    startDate: moment().startOf("month").format(format)
  });
  const { endDate, error, events, isLoading, startDate } = state;

  const handleDateChange = React.useCallback(
    ({ name, date }: { name: string; date: MaterialUiPickersDate }): void => {
      setState(prevState => ({
        ...prevState,
        events: [],
        errors: false,
        isLoading: true,
        [name]: date.format(format)
      }));
    },
    []
  );

  const fetchEventsDistribution = React.useCallback(
    async (startDate: string, endDate: string): Promise<void> => {
      try {
        const res = await app.get(
          `dashboard/event-distribution?&startDate=${startDate}&endDate=${endDate}`
        );
        const data = parseData<Array<TEventDistributionData>>(res);

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
    },
    []
  );

  const handleReload = React.useCallback(() => {
    setState(prevState => ({
      ...prevState,
      error: false,
      events: [],
      isLoading: true
    }));
  }, []);

  React.useEffect(() => {
    if (isLoading) fetchEventsDistribution(startDate, endDate);
  }, [isLoading, fetchEventsDistribution]);

  return (
    <Card
      dataTestId="dashboard-event-distribution"
      icon={<FaChartBar />}
      title="Event Distribution"
      padding="0"
    >
      <APFormTitle>Employee Scheduled Events Distribution</APFormTitle>
      <Padding top="10px" left="20px" right="20px">
        <Center style={{ height: "750px" }}>
          <PanelDescription data-testid="ap-form">
            Event distribution for&nbsp;
          </PanelDescription>
          <FlexCenter justify="center" style={{ margin: "5px 0 10px 0" }}>
            <DatePicker
              name="startDate"
              value={startDate}
              onChange={handleDateChange}
            />
            <Margin left="10px" right="10px">
              to
            </Margin>
            <DatePicker
              name="endDate"
              value={endDate}
              onChange={handleDateChange}
            />
          </FlexCenter>
          {isLoading ? (
            <LoadingPanel
              data-testid="loading-events"
              borderRadius="5px"
              height="660px"
              margin="5px auto 0"
            />
          ) : error ? (
            <FetchError height="690px" onClickReload={handleReload} />
          ) : (
            <EventDistributionChart events={events} />
          )}
        </Center>
      </Padding>
    </Card>
  );
};

export default EventDistribution;
