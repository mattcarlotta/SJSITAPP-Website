import { mount, ReactWrapper } from "enzyme";
import waitFor from "~utils/waitFor";
import mockApp from "~utils/mockAxios";
import Events from "../index";

const initProps = {
  isMember: true,
  loggedinUserId: "88"
};

const gameSchedule = [
  {
    _id: "0123456789",
    eventDate: "2019-08-10T02:30:31.834+00:00",
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

const APIURL = "dashboard/events/today";
mockApp
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200)
  .onGet(APIURL)
  .replyOnce(200, gameSchedule)
  .onGet(APIURL)
  .replyOnce(400)
  .onGet(APIURL)
  .replyOnce(400)
  .onGet(APIURL)
  .reply(200);

mockApp.onGet("dashboard/events/upcoming").reply(400);

describe("Dashboard Events Tab", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<Events {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  it("renders without errors and displays a placeholder", async () => {
    await waitFor(() => {
      expect(findById("dashboard-events")).toExist();
      expect(findById("loading-events")).toExist();
    });
  });

  it("toggles to 'upcoming' and 'today' tab and calls API again", async () => {
    findById("tab-upcoming").at(1).simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("fetch-error")).toExist();
    });

    findById("tab-today").at(1).simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("no-events")).toExist();
    });
  });

  it("displays no events message when no data is returned from API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("no-events")).toExist();
    });
  });

  it("displays a button when events data has been retrieve from the API", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("upcoming-event")).toExist();
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
      expect(findById("no-events")).toExist();
    });
  });
});
