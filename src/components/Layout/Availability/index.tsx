import * as React from "react";
import isEmpty from "lodash.isempty";
import Select from "~components/Forms/Select";
import AvailabilityAvgChart from "~components/Layout/AvailabilityAvgChart";
import AvailabilityResponseChart from "~components/Layout/AvailabilityResponseChart";
import Center from "~components/Layout/Center";
import EventScheduleChart from "~components/Layout/EventScheduleChart";
import FadeIn from "~components/Layout/FadeIn";
import FetchError from "~components/Layout/FetchError";
import FlexCenter from "~components/Layout/FlexCenter";
import Legend from "~components/Layout/Legend";
import Line from "~components/Layout/Line";
import NoAvailability from "~components/Layout/NoAvailability";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import Title from "~components/Layout/Title";
import Word from "~components/Layout/Word";
import app from "~utils/axiosConfig";
import {
  fullyearFormat,
  monthnameFormat,
  yearMonthFormat
} from "~utils/dateFormats";
import moment from "~utils/momentWithTimezone";
import { parseData } from "~utils/parseResponse";
import { TAvailabilityAggData, EventTarget } from "~types";

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
  }, [app, parseData, id, selectedMonth, selectedYear, yearMonthFormat]);

  const handleDateChange = ({ target: { name, value } }: EventTarget): void => {
    setState(prevState => ({
      ...prevState,
      error: false,
      isLoading: true,
      [name]: value
    }));
  };

  const handleReload = (): void => {
    setState(prevState => ({
      ...prevState,
      error: false,
      events: {} as TAvailabilityAggData,
      isLoading: true
    }));
  };

  React.useEffect(() => {
    if (isLoading) fetchAvailability();
  }, [fetchAvailability, isLoading]);

  return (
    <>
      <Center data-testid="my-availability">
        <Title>My Availability</Title>
        <Line centered maxWidth="225px" />
        <Padding top="16px">
          <Select
            hideIcon
            hideScrollbar
            hoverable
            height="auto"
            background="#f7f7f7"
            display="inline-block"
            justifyContent="center"
            padding="8px"
            textAlign="center"
            width="115px"
            name="selectedMonth"
            selectOptions={months}
            value={selectedMonth}
            onChange={handleDateChange}
          />
          <Word breakpoint top="10px" left="10px" right="10px">
            of
          </Word>
          <Select
            hideIcon
            hideScrollbar
            hoverable
            height="auto"
            background="#f7f7f7"
            display="inline-block"
            justifyContent="center"
            padding="8px"
            textAlign="center"
            width="110px"
            name="selectedYear"
            selectOptions={years}
            value={selectedYear}
            onChange={handleDateChange}
          />
        </Padding>
      </Center>
      {error ? (
        <FetchError height="1008px" onClickReload={handleReload} />
      ) : (
        <Padding top="20px" style={{ minHeight: "820px" }}>
          {!isEmpty(events) ? (
            <>
              <Center data-testid="availability-description">
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
        </Padding>
      )}
    </>
  );
};

export default Availability;
