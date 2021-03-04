import { mount } from "enzyme";
import mockApp from "~utils/mockAxios";
import waitFor from "~utils/waitFor";
import Events from "../index";

const initProps = {
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

describe("Dashboard Events Tab", () => {
  afterEach(() => {
    mockApp.reset();
  });

  it("renders without errors and displays a placeholder", async () => {
    const wrapper = mount(<Events {...initProps} />);
    await waitFor(() => {
      expect(wrapper.find("[data-testid='dashboard-events']")).toExist();
      expect(wrapper.find("[data-testid='loading-events']")).toExist();
    });
  });

  it("toggles to 'upcoming' and 'today' tab and calls API again", async () => {
    mockApp.onGet(APIURL).reply(200);
    mockApp.onGet("dashboard/events/upcoming").reply(400);
    const wrapper = mount(<Events {...initProps} />);

    wrapper.find("[data-testid='tab-upcoming']").at(1).simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='fetch-error']")).toExist();
    });

    wrapper.find("[data-testid='tab-today']").at(1).simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='no-events']")).toExist();
    });
  });

  it("displays no events message when no data is returned from API", async () => {
    mockApp.onGet(APIURL).reply(200);
    const wrapper = mount(<Events {...initProps} />);

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='no-events']")).toExist();
    });
  });

  it("displays a button when events data has been retrieve from the API", async () => {
    mockApp.onGet(APIURL).reply(200, gameSchedule);
    const wrapper = mount(<Events {...initProps} />);

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='upcoming-event']")).toExist();
    });
  });

  it("displays an error message when the request to the API failed", async () => {
    mockApp.onGet(APIURL).reply(400);
    const wrapper = mount(<Events {...initProps} />);

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='fetch-error']")).toExist();
    });
  });

  it("attempts to reload the component when a request to the API failed", async () => {
    mockApp.onGet(APIURL).replyOnce(400).onGet(APIURL).replyOnce(200);
    const wrapper = mount(<Events {...initProps} />);

    await waitFor(async () => {
      wrapper.update();

      expect(wrapper.find("[data-testid='fetch-error']")).toExist();
      expect(wrapper.find("[data-testid='reload-component']")).toExist();
      wrapper
        .find("[data-testid='reload-component']")
        .first()
        .simulate("click");
    });

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='no-events']")).toExist();
    });
  });
});
