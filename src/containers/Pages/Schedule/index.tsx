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
import generateCalendarDays from "~utils/generateCalendarDays";
import { parseData } from "~utils/parseResponse";
import { TEventData, TRootState } from "~types";

export type TScheduleState = {
  days: Array<string>;
  error: boolean;
  events: Array<TEventData>;
  isLoading: boolean;
  months: Array<string>;
  selectedGames: string;
  selectedMonth: string;
  selectedYear: string;
  years: Array<number>;
};

export type TScheduleProps = {
  loggedinUserId: string;
};

export const format = "YYYY-MM-DDTHH:mm:ssZ";
export const simpleFormat = "MMMM YYYY";
export const eventFormat = "YYYY-MM-DD";

export const Schedule = ({ loggedinUserId }: TScheduleProps): JSX.Element => {
  const [state, setState] = React.useState<TScheduleState>({
    days: generateCalendarDays(
      moment().daysInMonth(),
      moment().format("MM"),
      moment().format("YYYY")
    ),
    error: false,
    events: [],
    isLoading: true,
    months: moment.months(),
    selectedGames: "All Events",
    selectedMonth: moment().format("MMMM"),
    selectedYear: moment().format("YYYY"),
    years: Array.from(
      { length: 11 },
      (_, i) => parseInt(moment().subtract(5, "year").format("YYYY"), 10) + i
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
    years
  } = state;
  const selectedDate = moment(
    `${selectedYear}-${selectedMonth}`,
    "YYYY-MMMM"
  ).format();

  const handleDateChange = React.useCallback(
    ({ name, value }: { name: string; value: string }): void => {
      setState(prevState => ({
        ...prevState,
        isLoading: true,
        error: false,
        [name]: value
      }));
    },
    []
  );

  const fetchSchedule = React.useCallback(
    async (selectedDate: string, selectedGames: string): Promise<void> => {
      try {
        const res = await app.get(
          `events/schedule?&selectedDate=${selectedDate}&selectedGames=${selectedGames}`
        );
        const data = parseData<Array<TEventData>>(res);

        const calendar = moment(selectedDate, format);

        setState(prevState => ({
          ...prevState,
          days: generateCalendarDays(
            calendar.daysInMonth(),
            calendar.format("MM"),
            calendar.format("YYYY")
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
    if (isLoading) fetchSchedule(selectedDate, selectedGames);
  }, [fetchSchedule, isLoading, selectedDate, selectedGames]);

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
            <FlexCenter
              breakpoint
              justify="center"
              style={{ margin: "5px 0 20px 0" }}
            >
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
              <FetchError height="966px" onClickReload={handleReload} />
            ) : (
              <Flex justify="center" flexwrap>
                {days.map(date => (
                  <Date
                    today={moment(date, eventFormat).isSame(
                      moment().format(eventFormat)
                    )}
                    key={date}
                  >
                    <Margin as="div" bottom="5px">
                      <Center>
                        <PanelDescription margin="0px">
                          {moment(date, eventFormat).format("ddd")}
                        </PanelDescription>
                        <Bold>{moment(date, eventFormat).format("D")}</Bold>
                      </Center>
                    </Margin>
                    {!isEmpty(events)
                      ? events.map(event =>
                          moment(event.eventDate).format(eventFormat) ===
                          date ? (
                            <DisplayEvents
                              key={event._id}
                              loggedinUserId={loggedinUserId}
                              events={[event]}
                              spacing={20}
                              height={30}
                              folder="calendar"
                            />
                          ) : null
                        )
                      : null}
                  </Date>
                ))}
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
