import * as React from "react";
import APFormTitle from "~components/Layout/APFormTitle";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import DatePicker from "~components/Forms/DatePicker";
import EventDistributionChart from "~components/Layout/EventDistributionChart";
import FadeIn from "~components/Layout/FadeIn";
import FetchError from "~components/Layout/FetchError";
import FlexCenter from "~components/Layout/FlexCenter";
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
  startDate: string;
};

export const format = "YYYY-MM-DDTHH:mm:ssZ";

export const EventDistribution = (): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventDistributionState>({
    endDate: moment().endOf("month").format(format),
    error: false,
    events: [],
    startDate: moment().startOf("month").format(format)
  });
  const { endDate, error, events, startDate } = state;

  const handleDateChange = React.useCallback(
    ({ name, value }: { name: string; value: MaterialUiPickersDate }): void => {
      setState(prevState => ({
        ...prevState,
        errors: false,
        [name]: value.format(format)
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
          events: data
        }));
      } catch (err) {
        setState(prevState => ({
          ...prevState,
          error: true
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
    fetchEventsDistribution(startDate, endDate);
  }, [startDate, endDate, fetchEventsDistribution]);

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
          {error ? (
            <FetchError height="690px" onClickReload={handleReload} />
          ) : (
            <FadeIn timing="500ms">
              <EventDistributionChart events={events} />
            </FadeIn>
          )}
        </Center>
      </Padding>
    </Card>
  );
};

export default EventDistribution;
