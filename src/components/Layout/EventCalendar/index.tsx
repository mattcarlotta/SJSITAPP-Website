import * as React from "react";
import { IconButton } from "@material-ui/core";
import isEmpty from "lodash.isempty";
import NativeSelect from "~components/Forms/NativeSelect";
import Bold from "~components/Layout/Bold";
import Center from "~components/Layout/Center";
import Date from "~components/Layout/Date";
import DisplayEvents from "~components/Layout/DisplayEvents";
import FetchError from "~components/Layout/FetchError";
import Flex from "~components/Layout/Flex";
import FlexCenter from "~components/Layout/FlexCenter";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import Margin from "~components/Layout/Margin";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import Tooltip from "~components/Layout/Tooltip";
import { IconContext, FaChevronLeft, FaChevronRight } from "~icons";
import app from "~utils/axiosConfig";
import {
  dayFormat,
  defaultFormat,
  eventFormat,
  fullyearFormat,
  monthdateFormat,
  monthnameFormat,
  weekdayFormat,
  yearMonthFormat
} from "~utils/dateFormats";
import generateCalendarDays from "~utils/generateCalendarDays";
import moment from "~utils/momentWithTimezone";
import { parseData } from "~utils/parseResponse";
import { TEventData } from "~types";

export type TEventCalendarState = {
  days: Array<string>;
  error: boolean;
  events: Array<TEventData>;
  isLoading: boolean;
  months: Array<string>;
  selectedGames: string;
  selectedMonth: string;
  selectedYear: string;
  today: string;
  years: Array<string>;
};

export type TEventCalendarProps = {
  id: string;
};

export const EventCalendar = ({ id }: TEventCalendarProps): JSX.Element => {
  const [state, setState] = React.useState<TEventCalendarState>({
    days: generateCalendarDays(
      moment().daysInMonth(),
      moment().format(monthdateFormat),
      moment().format(fullyearFormat)
    ),
    error: false,
    events: [],
    isLoading: true,
    months: moment.months(),
    selectedGames: "All Events",
    selectedMonth: moment().format(monthnameFormat),
    selectedYear: moment().format(fullyearFormat),
    today: moment().format(eventFormat),
    years: Array.from({ length: 11 }, (_, i) =>
      moment().subtract(5, "years").add(i, "years").format(fullyearFormat)
    )
  });
  const {
    days,
    error,
    events,
    isLoading,
    months,
    selectedGames,
    selectedMonth,
    selectedYear,
    today,
    years
  } = state;

  const fetchSchedule = React.useCallback(async (): Promise<void> => {
    try {
      const selectedDate = moment(
        `${selectedYear} ${selectedMonth}`,
        yearMonthFormat
      ).format();

      const res = await app.get(
        `events/schedule?id=${id}&selectedDate=${selectedDate}&selectedGames=${selectedGames}`
      );

      const data = parseData<Array<TEventData>>(res);

      const calendar = moment(selectedDate, defaultFormat);

      setState(prevState => ({
        ...prevState,
        days: generateCalendarDays(
          calendar.daysInMonth(),
          calendar.format(monthdateFormat),
          calendar.format(fullyearFormat)
        ),
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
  }, [id, selectedGames, selectedMonth, selectedYear]);

  const handleMonthChange = React.useCallback((days: number): void => {
    setState(prevState => ({
      ...prevState,
      error: false,
      isLoading: true,
      selectedMonth: moment(
        `${prevState.selectedYear}-${prevState.selectedMonth}`,
        yearMonthFormat
      )
        .add(days, "month")
        .format(monthnameFormat)
    }));
  }, []);

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
      events: []
    }));
  }, []);

  React.useEffect(() => {
    if (isLoading) fetchSchedule();
  }, [fetchSchedule, isLoading]);

  return (
    <Padding top="10px" left="20px" right="20px" bottom="30px">
      <Center>
        <IconContext.Provider
          value={{
            style: {
              color: "#0d6472",
              fontSize: 22
            }
          }}
        >
          <Flex padding="0 5px">
            <FlexStart>
              <Tooltip title="Previous Month">
                <IconButton
                  data-testid="previous-month-button"
                  aria-label="go to previous month"
                  onClick={() => handleMonthChange(-1)}
                >
                  <FaChevronLeft />
                </IconButton>
              </Tooltip>
            </FlexStart>
            <FlexCenter breakpoint justify="center" margin="10px 0 20px 0">
              <NativeSelect
                name="selectedGames"
                options={["All Events", "My Events"]}
                value={selectedGames}
                onChange={handleDateChange}
              />
              <Margin left="10px" right="10px">
                in
              </Margin>
              <NativeSelect
                name="selectedMonth"
                options={months}
                value={selectedMonth}
                onChange={handleDateChange}
              />
              <Margin left="10px" right="10px">
                of
              </Margin>
              <NativeSelect
                name="selectedYear"
                options={years}
                value={selectedYear}
                onChange={handleDateChange}
              />
            </FlexCenter>
            <FlexEnd>
              <Tooltip title="Next Month">
                <IconButton
                  aria-label="go to next month"
                  data-testid="next-month-button"
                  onClick={() => handleMonthChange(1)}
                >
                  <FaChevronRight />
                </IconButton>
              </Tooltip>
            </FlexEnd>
          </Flex>
        </IconContext.Provider>
        {error ? (
          <FetchError height="1008px" onClickReload={handleReload} />
        ) : (
          <Flex flexwrap background="#0d6472" justify="start" padding="5px">
            {days.map((date, index) => {
              const calendarDate = moment(date, eventFormat);
              return (
                <Date
                  today={calendarDate.isSame(today)}
                  fadeIn={`${index * 0.5 * 75}ms`}
                  key={date}
                >
                  <Margin as="div" bottom="5px">
                    <Center>
                      <PanelDescription margin="0px">
                        {calendarDate.format(weekdayFormat)}
                      </PanelDescription>
                      <Bold>{calendarDate.format(dayFormat)}</Bold>
                    </Center>
                  </Margin>
                  {!isEmpty(events) &&
                    events.map(event =>
                      moment(event.eventDate, defaultFormat).format(
                        eventFormat
                      ) === date ? (
                        <DisplayEvents
                          key={event._id}
                          id={id}
                          events={[event]}
                          spacing={20}
                          height={30}
                          folder="calendar"
                        />
                      ) : null
                    )}
                </Date>
              );
            })}
          </Flex>
        )}
      </Center>
    </Padding>
  );
};

export default EventCalendar;
