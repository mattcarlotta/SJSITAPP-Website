import { mount, ReactWrapper } from "enzyme";
import { eventFormat, monthnameFormat } from "~utils/dateFormats";
import waitFor from "~utils/waitFor";
import mockApp from "~utils/mockAxios";
import moment from "~utils/momentWithTimezone";
import EventCalendar from "../index";

const id = "88";
const startMonth = moment().startOf("month");
const nextMonth = moment().add(1, "month").startOf("month");
const prevMonth = moment().subtract(1, "month").startOf("month");

const events = [
  {
    _id: "0123456789",
    eventDate: startMonth.format(),
    eventNotes: "",
    eventType: "Game",
    employeeResponse: "",
    employeeNotes: "",
    location: "SAP Center at San Jose",
    notes: "Parking will be crowded.",
    opponent: "Anaheim Ducks",
    response: "",
    team: "San Jose Sharks",
    schedule: [
      {
        _id: "2019-08-09T17:45:26-07:00",
        employeeIds: [
          {
            _id: "88",
            firstName: "John",
            lastName: "Smith"
          }
        ]
      }
    ],
    uniform: "Sharks Teal Jersey"
  }
];

const nextEvent = [{ ...events[0], eventDate: nextMonth.format() }];
const prevEvent = [{ ...events[0], eventDate: prevMonth.format() }];

const APIURL = `events/schedule?id=${id}&selectedDate=${startMonth.format()}&selectedGames=All Events`;
const NEXTMONURL = `events/schedule?id=${id}&selectedDate=${nextMonth.format()}&selectedGames=All Events`;
const PREVMONURL = `events/schedule?id=${id}&selectedDate=${prevMonth.format()}&selectedGames=All Events`;

mockApp
  .onGet(APIURL)
  .replyOnce(200) // renders without errors (1)
  .onGet(APIURL)
  .replyOnce(200, events) // upcoming event (2)
  .onGet(APIURL)
  .replyOnce(200) // next month (3)
  .onGet(APIURL)
  .replyOnce(200) // previous month (4)
  .onGet(APIURL)
  .replyOnce(200) // month selector (5)
  .onGet(APIURL)
  .replyOnce(400) // API down (6)
  .onGet(APIURL)
  .replyOnce(400)
  .onGet(APIURL)
  .reply(200);

mockApp
  .onGet(NEXTMONURL)
  .replyOnce(200, nextEvent) // next month chevron (3)
  .onGet(NEXTMONURL)
  .replyOnce(200, nextEvent); // month selector (5)

mockApp
  .onGet(PREVMONURL) // previous months (4)
  .replyOnce(200, prevEvent);

describe("Dashboard EventCalendar", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<EventCalendar id={id} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  it("renders without errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("calendar")).toExist();
      expect(findById("calender-container")).toExist();
    });
  });

  it("displays an upcoming event on the calendar when data has been retrieved from the API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("upcoming-event")).toExist();
    });
  });

  it("displays next months calendar when the right chevron button is clicked", async () => {
    findById("next-month-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(
        findById(`${nextMonth.format(eventFormat)}`).find(
          "[data-testid='upcoming-event']"
        )
      ).toExist();
    });
  });

  it("displays previous months calendar when the left chevron button is clicked", async () => {
    findById("previous-month-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(
        findById(`${prevMonth.format(eventFormat)}`).find(
          "[data-testid='upcoming-event']"
        )
      ).toExist();
    });
  });

  it("displays next months calendar when the month selector is clicked and the next month is selected", async () => {
    wrapper.find('[role="button"]').at(1).simulate("mousedown", { button: 0 });
    findById(nextMonth.format(monthnameFormat)).first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(
        findById(`${nextMonth.format(eventFormat)}`).find(
          "[data-testid='upcoming-event']"
        )
      ).toExist();
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
      expect(findById("calender-container")).toExist();
    });
  });
});
