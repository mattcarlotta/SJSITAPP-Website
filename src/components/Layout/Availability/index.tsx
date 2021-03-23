import * as React from "react";
import isEmpty from "lodash.isempty";
import NativeSelect from "~components/Forms/NativeSelect";
import AvailabilityAvgChart from "~components/Layout/AvailabilityAvgChart";
import AvailabilityResponseChart from "~components/Layout/AvailabilityResponseChart";
import Center from "~components/Layout/Center";
import EventScheduleChart from "~components/Layout/EventScheduleChart";
import FadeIn from "~components/Layout/FadeIn";
import FetchError from "~components/Layout/FetchError";
import FlexCenter from "~components/Layout/FlexCenter";
import Legend from "~components/Layout/Legend";
import Line from "~components/Layout/Line";
import Margin from "~components/Layout/Margin";
import NoAvailability from "~components/Layout/NoAvailability";
import PanelDescription from "~components/Layout/PanelDescription";
import Title from "~components/Layout/Title";
import app from "~utils/axiosConfig";
import {
  fullyearFormat,
  monthnameFormat,
  yearMonthFormat
} from "~utils/dateFormats";
import moment from "~utils/momentWithTimezone";
import { parseData } from "~utils/parseResponse";
import { TAvailabilityAggData } from "~types";

export type TAvailabilityState = {
  error: boolean;
  events: TAvailabilityAggData;
  isLoading: boolean;
  months: Array<string>;
  selectedMonth: string;
  selectedYear: string;
  years: Array<string>;
};

export type TAvailabilityProps = {
  id: string;
};

const Availability = ({ id }: TAvailabilityProps): JSX.Element => {
  const [state, setState] = React.useState<TAvailabilityState>({
    error: false,
    events: {} as TAvailabilityAggData,
    isLoading: true,
    months: moment.months(),
    selectedMonth: moment().format(monthnameFormat),
    selectedYear: moment().format(fullyearFormat),
    years: Array.from({ length: 11 }, (_, i) =>
      moment().subtract(5, "years").add(i, "years").format(fullyearFormat)
    )
  });
  const {
    error,
    events,
    isLoading,
    months,
    selectedMonth,
    selectedYear,
    years
  } = state;

  const fetchAvailability = React.useCallback(async (): Promise<void> => {
    try {
      const selectedDate = moment(
        `${selectedYear} ${selectedMonth}`,
        yearMonthFormat
      ).format();

      const res = await app.get(
        `events/availability?id=${id}&selectedDate=${selectedDate}`
      );
      const data = parseData<TAvailabilityAggData>(res);

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
  }, [id, selectedMonth, selectedYear]);

  const handleDateChange = React.useCallback(
    ({ name, value }: { name: string; value: string }): void => {
      setState(prevState => ({
        ...prevState,
        error: false,
        isLoading: true,
        [name]: value
      }));
    },
    []
  );

  const handleReload = React.useCallback(() => {
    setState(prevState => ({
      ...prevState,
      error: false,
      events: {} as TAvailabilityAggData,
      isLoading: true
    }));
  }, []);

  React.useEffect(() => {
    if (isLoading) fetchAvailability();
  }, [fetchAvailability, isLoading]);

  return (
    <>
      <Center>
        <Title>My Availability</Title>
        <Line centered width="400px" />
        <Margin as="div" top="20px">
          <NativeSelect
            name="selectedMonth"
            options={months}
            value={selectedMonth}
            onChange={handleDateChange}
          />
          <Margin left="10px" right="10px" />
          <NativeSelect
            name="selectedYear"
            options={years}
            value={selectedYear}
            onChange={handleDateChange}
          />
        </Margin>
      </Center>
      {error ? (
        <FetchError height="1008px" onClickReload={handleReload} />
      ) : (
        <Margin as="div" top="20px" style={{ height: "820px" }}>
          {!isEmpty(events) ? (
            <>
              <Center>
                <PanelDescription margin="0 auto" style={{ maxWidth: 900 }}>
                  Availability is calculated by combining the first two options
                  in the legend below and comparing the aggregated value against
                  the last three options aggregated value. For example, if
                  you&#39;ve chosen &quot;I want to work&quot; or
                  &quot;Available to work&quot; in an A/P form, then that counts
                  toward as being available.
                </PanelDescription>
              </Center>
              <FlexCenter breakpoint justify="center" margin="10px 0">
                <AvailabilityAvgChart
                  availability={events.eventAvailability}
                  style={{ height: "250px", margin: 0 }}
                />
                <Legend style={{ maxWidth: 225 }} />
                <AvailabilityResponseChart
                  availability={events.memberResponseCount}
                  style={{ height: "250px", margin: 0 }}
                />
              </FlexCenter>
              <Center>
                <PanelDescription margin="0 auto" style={{ maxWidth: 900 }}>
                  The chart below shows the amount of games that were available
                  in {selectedMonth} and the amount of games that you were
                  scheduled.
                </PanelDescription>
              </Center>
              <EventScheduleChart events={events.memberScheduleEvents} />
            </>
          ) : !isLoading ? (
            <FadeIn timing="1.5s">
              <NoAvailability height="820px" />
            </FadeIn>
          ) : null}
        </Margin>
      )}
    </>
  );
};

export default Availability;
