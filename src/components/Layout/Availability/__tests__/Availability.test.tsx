import { mount, ReactWrapper } from "enzyme";
import {
  fullyearFormat,
  monthnameFormat,
  yearMonthFormat
} from "~utils/dateFormats";
import mockApp from "~utils/mockAxios";
import moment from "~utils/momentWithTimezone";
import waitFor from "~utils/waitFor";
import Availability from "../index";

const id = "88";
const initProps = {
  id
};

const eventAvailability = [
  { id: "available", value: 100 },
  { id: "unavailable", value: 0 }
];

const memberResponseCount = [
  { id: "I want to work.", value: 2 },
  { id: "Available to work.", value: 0 },
  { id: "Prefer not to work.", value: 0 },
  { id: "Not available to work.", value: 0 },
  { id: "No response.", value: 0 }
];

const memberScheduleEvents = [
  { id: "scheduled", events: 2 },
  { id: "available", events: 2 }
];

const events = {
  eventAvailability,
  memberResponseCount,
  memberScheduleEvents
};

const selectedMonth = moment().format(monthnameFormat);
const selectedYear = moment().format(fullyearFormat);
const nextSelectedMonth = moment().add(1, "month").format(monthnameFormat);

const getSelectedDate = (month: string): string =>
  moment(`${selectedYear}-${month}`, yearMonthFormat).format();

const currentMonth = getSelectedDate(selectedMonth);
const nextMonth = getSelectedDate(nextSelectedMonth);

const APIURL = `events/availability?id=${id}&selectedDate=${currentMonth}`;
const NEXTAPIURL = `events/availability?id=${id}&selectedDate=${nextMonth}`;

mockApp
  .onGet(APIURL)
  .replyOnce(200) // renders without errors
  .onGet(APIURL)
  .replyOnce(200) // no availability
  .onGet(APIURL)
  .replyOnce(200, events) // availability
  .onGet(APIURL)
  .replyOnce(200, events) // date change
  .onGet(NEXTAPIURL)
  .replyOnce(200) // date change
  .onGet(APIURL)
  .replyOnce(400) // fetch error
  .onGet(APIURL)
  .replyOnce(400)
  .onGet(APIURL)
  .reply(200);

mockApp.onGet("dashboard/events/upcoming").reply(400);

describe("Dashboard Events Tab", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Availability {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  it("renders without errors", async () => {
    await waitFor(() => {
      expect(findById("my-availability")).toExist();
    });
  });

  it("displays no availability message when no data is returned from API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("no-availability")).toExist();
    });
  });

  it("displays availability data when it has been retrieved from the API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("availability-description")).toExist();
      expect(findById("availability-chart")).toExist();
      expect(findById("availability-response-chart")).toExist();
      expect(findById("event-schedule-chart")).toExist();
    });
  });

  it("retrieves event distribution data from the API on date change", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("availability-description")).toExist();
    });

    findById("selectedMonth")
      .find("[data-testid='select-text']")
      .first()
      .simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById(nextSelectedMonth)).toExist();

      // change to next month
      findById(nextSelectedMonth).first().simulate("click");
    });

    await waitFor(() => {
      wrapper.update();
      expect(findById("no-availability")).toExist();
    });
  });

  it("displays an error message when the request to the API failed", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("fetch-error")).toExist();
    });
  });

  it("attempts to reload the component when a request to the API failed", async () => {
    await waitFor(async () => {
      wrapper.update();
      expect(findById("fetch-error")).toExist();
      expect(findById("reload-component")).toExist();
    });

    findById("reload-component").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("no-availability")).toExist();
    });
  });
});
