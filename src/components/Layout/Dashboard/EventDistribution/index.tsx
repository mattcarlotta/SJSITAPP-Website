import * as React from "react";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import DatePicker from "~components/Forms/DatePicker";
import EventDistributionChart from "~components/Layout/EventDistributionChart";
import FadeIn from "~components/Layout/FadeIn";
import FetchError from "~components/Layout/FetchError";
import FlexCenter from "~components/Layout/FlexCenter";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import Word from "~components/Layout/Word";
import { FaChartBar } from "~icons";
import moment from "~utils/momentWithTimezone";
import app from "~utils/axiosConfig";
import { defaultFormat } from "~utils/dateFormats";
import { parseData } from "~utils/parseResponse";
import { MaterialUiPickersDate, TEventDistributionData } from "~types";

export type TDashboardEventDistributionState = {
  endDate: string;
  error: boolean;
  events: Array<TEventDistributionData>;
  startDate: string;
};

export const EventDistribution = (): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventDistributionState>({
    endDate: moment().endOf("month").format(defaultFormat),
    error: false,
    events: [],
    startDate: moment().startOf("month").format(defaultFormat)
  });
  const { endDate, error, events, startDate } = state;

  const handleDateChange = React.useCallback(
    ({ name, value }: { name: string; value: MaterialUiPickersDate }): void => {
      setState(prevState => ({
        ...prevState,
        errors: false,
        [name]: value.format(defaultFormat)
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
      breakpoint
      dataTestId="dashboard-event-distribution"
      icon={<FaChartBar />}
      title="Event Distribution"
      subtitle="Employee Scheduled Events Distribution"
    >
      <Padding top="10px" left="20px" right="20px">
        <Center style={{ height: "750px" }}>
          <PanelDescription data-testid="ap-form">
            Event distribution for&nbsp;
          </PanelDescription>
          <FlexCenter justify="center" margin="5px 0 10px 0">
            <DatePicker
              name="startDate"
              value={startDate}
              onChange={handleDateChange}
            />
            <Word left="10px" right="10px">
              to
            </Word>
            <DatePicker
              name="endDate"
              value={endDate}
              onChange={handleDateChange}
            />
          </FlexCenter>
          {error ? (
            <FetchError height="690px" onClickReload={handleReload} />
          ) : (
            <FadeIn timing="1s">
              <EventDistributionChart events={events} />
            </FadeIn>
          )}
        </Center>
      </Padding>
    </Card>
  );
};

export default EventDistribution;
