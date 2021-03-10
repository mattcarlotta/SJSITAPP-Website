import * as React from "react";
import isEmpty from "lodash.isempty";
import NativeSelect from "~components/Forms/NativeSelect";
import APFormTitle from "~components/Layout/APFormTitle";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
// import DatePicker from "~components/Forms/DatePicker";
// import EventDistributionChart from "~components/Layout/EventDistributionChart";
// import FadeIn from "~components/Layout/FadeIn";
// import FetchError from "~components/Layout/FetchError";
import Date from "~components/Layout/Date";
import Flex from "~components/Layout/Flex";
import FlexCenter from "~components/Layout/FlexCenter";
import InlineBlock from "~components/Layout/InlineBlock";
import Margin from "~components/Layout/Margin";
import Padding from "~components/Layout/Padding";
import { FaCalendar } from "~icons";
import moment from "~utils/momentWithTimezone";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import { ChangeEvent, Moment, TEventData } from "~types";
// import { css } from "@emotion/react";
import DisplayEvents from "../DisplayEvents";

export type TDashboardEventDistributionState = {
  days: Array<string>;
  events: Array<TEventData>;
  selectedDate: Moment;
  selectedGames: string;
  selectedMonth: string;
  selectedYear: number;
  // years: Array<string>;
};

export const format = "YYYY-MM-DDTHH:mm:ssZ";
export const simpleFormat = "MMMM YYYY";
export const eventFormat = "YYYY-MM-DD";

export const generateDays = (
  max: number,
  month: string,
  year: string
): Array<string> => {
  return Array.from({ length: max }, (_, i) =>
    moment(
      `${year}-${month}-${i + 1 < 10 ? `0${i + 1}` : i + 1}`,
      eventFormat
    ).format(eventFormat)
  );
};

export const Schedule = (): JSX.Element => {
  const [state, setState] = React.useState<TDashboardEventDistributionState>({
    days: generateDays(
      moment().daysInMonth(),
      moment().format("MM"),
      moment().format("YYYY")
    ),
    events: [],
    selectedDate: moment().startOf("month"),
    selectedGames: "All Events",
    selectedMonth: moment().format("MMMM"),
    selectedYear: parseInt(moment().format("YYYY"), 10)
  });
  const {
    days,
    events,
    selectedDate,
    selectedGames,
    selectedMonth,
    selectedYear
  } = state;

  const handleDateChange = React.useCallback((e: ChangeEvent<any>): void => {
    setState(prevState => ({
      ...prevState,
      errors: false,
      [e.target.name]: e.target.value
    }));
  }, []);

  const fetchSchedule = React.useCallback(
    async (selectedDate: string, selectedGames: string): Promise<void> => {
      try {
        const res = await app.get(
          `events/schedule?&selectedDate=${selectedDate}&selectedGames=${selectedGames}`
        );
        const data = parseData<Array<TEventData>>(res);

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

  // const handleReload = React.useCallback(() => {
  //   setState(prevState => ({
  //     ...prevState,
  //     error: false,
  //     events: [],
  //     isLoading: true
  //   }));
  // }, []);

  React.useEffect(() => {
    fetchSchedule(selectedDate.format(), selectedGames);
  }, [fetchSchedule, selectedDate, selectedGames]);

  return (
    <Card
      dataTestId="schedule"
      icon={<FaCalendar />}
      title="Schedule"
      padding="0"
    >
      <APFormTitle>
        {selectedGames} in {selectedDate.format(simpleFormat)}
      </APFormTitle>
      <Padding top="10px" left="20px" right="20px" bottom="30px">
        <Center>
          <FlexCenter justify="center" style={{ margin: "5px 0 10px 0" }}>
            <NativeSelect
              name="selectedGames"
              options={["All Events", "My Events"]}
              value={selectedGames}
              onChange={handleDateChange}
            />
            <Margin left="10px" right="10px">
              to
            </Margin>
            <div>Tomorrow</div>
            {/* <DatePicker
              name="startDate"
              value={startDate}
              onChange={handleDateChange}
            />
            <DatePicker
              name="endDate"
              value={endDate}
              onChange={handleDateChange}
            /> */}
          </FlexCenter>
          <Flex flexwrap>
            {days.map(date => (
              <Date key={date}>
                <Margin bottom="5px">
                  <InlineBlock>
                    {moment(date, eventFormat).format("ddd")}
                  </InlineBlock>
                  <InlineBlock textAlign="right">
                    {moment(date, eventFormat).format("DD")}
                  </InlineBlock>
                </Margin>
                {!isEmpty(events)
                  ? events.map(event =>
                      moment(event.eventDate).format(eventFormat) === date ? (
                        <DisplayEvents
                          key={event._id}
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
        </Center>
      </Padding>
    </Card>
  );
};

export default Schedule;
