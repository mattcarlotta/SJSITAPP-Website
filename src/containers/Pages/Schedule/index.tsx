import * as React from "react";
import { connect } from "react-redux";
import isEmpty from "lodash.isempty";
import NativeSelect from "~components/Forms/NativeSelect";
import APFormTitle from "~components/Layout/APFormTitle";
import Bold from "~components/Layout/Bold";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import Date from "~components/Layout/Date";
import DisplayEvents from "~components/Layout/DisplayEvents";
import FetchError from "~components/Layout/FetchError";
import Flex from "~components/Layout/Flex";
import FlexCenter from "~components/Layout/FlexCenter";
import Margin from "~components/Layout/Margin";
import Padding from "~components/Layout/Padding";
import PanelDescription from "~components/Layout/PanelDescription";
import Header from "~components/Navigation/Header";
import { FaCalendar } from "~icons";
import moment from "~utils/momentWithTimezone";
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
import { parseData } from "~utils/parseResponse";
import { TEventData, TRootState } from "~types";

export type TScheduleState = {
  days: Array<string>;
  error: boolean;
  events: Array<TEventData>;
  months: Array<string>;
  selectedGames: string;
  selectedMonth: string;
  selectedYear: string;
  today: string;
  years: Array<string>;
};

export type TScheduleProps = {
  loggedinUserId: string;
};

export const Schedule = ({ loggedinUserId }: TScheduleProps): JSX.Element => {
  const [state, setState] = React.useState<TScheduleState>({
    days: generateCalendarDays(
      moment().daysInMonth(),
      moment().format(monthdateFormat),
      moment().format(fullyearFormat)
    ),
    error: false,
    events: [],
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
        `events/schedule?&selectedDate=${selectedDate}&selectedGames=${selectedGames}`
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
        events: data
      }));
    } catch (err) {
      setState(prevState => ({
        ...prevState,
        error: true
      }));
    }
  }, [selectedGames, selectedMonth, selectedYear]);

  const handleDateChange = React.useCallback(
    ({ name, value }: { name: string; value: string }): void => {
      setState(prevState => ({
        ...prevState,
        error: false,
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
    fetchSchedule();
  }, [fetchSchedule, selectedGames, selectedMonth, selectedYear]);

  return (
    <>
      <Header title="Schedule" url="/employee/schedule" />
      <Card
        dataTestId="schedule"
        icon={<FaCalendar />}
        title="Schedule"
        padding="0"
      >
        <APFormTitle>Event Calendar</APFormTitle>
        <Padding top="10px" left="20px" right="20px" bottom="30px">
          <Center>
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
            {error ? (
              <FetchError height="1008px" onClickReload={handleReload} />
            ) : (
              <Flex justify="center" flexwrap>
                {days.map(date => {
                  const calendarDate = moment(date, eventFormat);
                  return (
                    <Date today={calendarDate.isSame(today)} key={date}>
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
                              loggedinUserId={loggedinUserId}
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
      </Card>
    </>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({ auth }: Pick<TRootState, "auth">) => ({
  loggedinUserId: auth.id
});

export default connect(mapStateToProps)(Schedule);
