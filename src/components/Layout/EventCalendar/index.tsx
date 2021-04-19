import * as React from "react";
import { IconButton } from "@material-ui/core";
import isEmpty from "lodash.isempty";
import Select from "~components/Forms/Select";
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
import Word from "~components/Layout/Word";
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
import { EventTarget, ReactElement, TEventData } from "~types";

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
  APIURL: string;
  id: string;
  disableGames?: boolean;
};

export const EventCalendar = ({
  APIURL,
  id,
  disableGames
}: TEventCalendarProps): ReactElement => {
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

  const fetchEvents = React.useCallback(async (): Promise<void> => {
    try {
      const selectedDate = moment(
        `${selectedYear} ${selectedMonth}`,
        yearMonthFormat
      ).format();

      const res = await app.get(
        `events/${APIURL}?id=${id}&selectedDate=${selectedDate}&selectedGames=${selectedGames}`
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
  }, [
    app,
    APIURL,
    generateCalendarDays,
    id,
    moment,
    parseData,
    selectedGames,
    selectedMonth,
    selectedYear
  ]);

  const handleMonthChange = (days: number): void => {
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
  };

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
      events: [],
      isLoading: true
    }));
  };

  React.useEffect(() => {
    if (isLoading) fetchEvents();
  }, [fetchEvents, isLoading]);

  return (
    <Padding
      data-testid="calendar"
      top="10px"
      left="20px"
      right="20px"
      bottom="30px"
    >
      <Center>
        <IconContext.Provider
          value={{
            style: {
              color: "#0d6472",
              fontSize: 22
            }
          }}
        >
          <Flex margin="10px 0 10px 0">
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
            <FlexCenter breakpoint justify="center" margin="0">
              {!disableGames && (
                <>
                  <Select
                    hideIcon
                    hoverable
                    height="auto"
                    background="#f7f7f7"
                    justifyContent="center"
                    width="120px"
                    padding="8px"
                    textAlign="center"
                    name="selectedGames"
                    selectOptions={["All Events", "My Events"]}
                    value={selectedGames}
                    onChange={handleDateChange}
                  />
                  <Word breakpoint top="10px" left="10px" right="10px">
                    in
                  </Word>
                </>
              )}
              <Select
                hideIcon
                hoverable
                height="auto"
                background="#f7f7f7"
                justifyContent="center"
                width="115px"
                padding="8px"
                textAlign="center"
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
                hoverable
                height="auto"
                background="#f7f7f7"
                justifyContent="center"
                width="110px"
                padding="8px"
                textAlign="center"
                name="selectedYear"
                selectOptions={years}
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
          <Flex
            data-testid="calender-container"
            flexwrap
            justify="center"
            padding="5px"
          >
            {days.map((date, index) => {
              const calendarDate = moment(date, eventFormat);
              return (
                <Date
                  data-testid={date}
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
