import { mount, ReactWrapper } from "enzyme";
import toast from "~components/App/Toast";
import waitFor from "~utils/waitFor";
import mockApp from "~utils/mockAxios";
import EventScheduleForm from "../index";

// @ts-ignore
window.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

jest.mock("~components/App/Toast");

const mockBack = jest.fn();
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    route: "/",
    pathname: "",
    query: { id: "88" },
    asPath: "/",
    push: mockPush,
    replace: mockReplace,
    back: mockBack
  }))
}));

const draggableId = "5d72dffe65ec39141ae78553";

const schedule = {
  columns: [
    {
      _id: "employees",
      title: "Employees",
      employeeIds: [
        "5d72dffe65ec39141ae78553",
        "5d72dffe65ec39141ae78554",
        "5d72dffe65ec39141ae78555"
      ]
    },
    { _id: "2019-10-31T17:15:43-07:00", title: "05:15 pm", employeeIds: [] }
  ],
  event: {
    _id: "5d72dffe65ec39141ae78561",
    callTimes: ["2019-10-31T17:15:43-07:00"],
    employeeResponses: [],
    eventDate: "2019-10-31T02:30:36.000Z",
    eventType: "Game",
    location: "SAP Center at San Jose",
    notes: "",
    opponent: "Arizona Coyotes",
    schedule: [
      {
        _id: "2019-10-31T17:15:43-07:00",
        employeeIds: [],
        title: "05:15 pm"
      }
    ],
    scheduledIds: [],
    seasonId: "20192020",
    team: "San Jose Sharks",
    uniform: "Sharks Teal Jersey"
  },
  users: [
    {
      _id: "5d72dffe65ec39141ae78553",
      firstName: "Member",
      lastName: "Member",
      response: "No response.",
      notes: "This is a note!"
    },
    {
      _id: "5d72dffe65ec39141ae78554",
      firstName: "Member2",
      lastName: "Member2",
      response: "No response.",
      notes: ""
    },
    {
      _id: "5d72dffe65ec39141ae78555",
      firstName: "Member3",
      lastName: "Member3",
      response: "No response.",
      notes: ""
    }
  ]
};

const members = [
  {
    name: "Matt Carlotta",
    "Event Count": 3
  },
  {
    name: "Bob Dole",
    "Event Count": 1
  }
];

const APIURL = "events/review/88";
mockApp
  .onGet(APIURL)
  .replyOnce(404)
  .onGet(APIURL)
  .replyOnce(404)
  .onGet(APIURL)
  .reply(200, schedule);

const MEMBERCOUNT = "members/event-counts/88";
mockApp
  .onGet(MEMBERCOUNT)
  .replyOnce(404)
  .onGet(MEMBERCOUNT)
  .reply(200, members);

const SUBMITEVENT = "events/update/schedule";
const successMessage = "Successfully scheduled event.";
mockApp
  .onPut(SUBMITEVENT)
  .replyOnce(404)
  .onPut(SUBMITEVENT)
  .reply(200, { message: successMessage });

describe("Event Schedule Form", () => {
  let wrapper: ReactWrapper;
  let root: HTMLDivElement;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
    wrapper = mount(<EventScheduleForm />, {
      attachTo: root
    });
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    mockBack.mockClear();
    mockPush.mockClear();
    mockReplace.mockClear();
    (toast as jest.Mock).mockClear();
  });

  afterAll(() => {
    document.body.removeChild(root);
  });

  it("renders without errors", () => {
    expect(findById("schedule-event-page")).toExist();
  });

  it("initially shows a loading indicator", () => {
    expect(findById("loading-schedule-event-form")).toExist();
  });

  it("loads the form without errors", async () => {
    await waitFor(() => {
      wrapper.update();

      expect(findById("schedule-event-form")).toExist();
    });
  });

  it("loads the form without errors", async () => {
    await waitFor(() => {
      wrapper.update();

      expect(findById("schedule-event-form")).toExist();
    });
  });

  it("handles failed/successful requests to load member event counts", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("schedule-event-form")).toExist();
    });

    findById("toggle-event-chart-overlay").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("fetch-error")).toExist();
    });

    findById("reload-component").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("event-distribution-chart")).toExist();
    });

    findById("close-modal").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("event-distribution-chart")).not.toExist();
    });
  });

  it("handles failed form submits", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("schedule-event-form")).toExist();
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
    });
  });

  it("handles successful form submits", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("schedule-event-form")).toExist();
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "success",
        message: successMessage
      });
      expect(mockBack).toHaveBeenCalledTimes(1);
    });
  });

  it("doesn't move an employee from 'employees' to an invalid container", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("schedule-event-form")).toExist();
    });

    await waitFor(() => {
      wrapper.update();
      expect(
        findById("column").at(1).find("[data-testid='user']")
      ).toHaveLength(6);
    });

    // @ts-ignore
    wrapper.find("DragDropContext").invoke("onDragEnd")({
      // @ts-ignore
      draggableId
    });

    await waitFor(() => {
      wrapper.update();
      expect(
        findById("column").at(1).find("[data-testid='user']")
      ).toHaveLength(6);
    });
  });

  it("moves an employee from 'employees' to a different index in same container", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("schedule-event-form")).toExist();
    });

    await waitFor(() => {
      wrapper.update();
      expect(
        findById("column").at(1).find("[data-testid='user']")
      ).toHaveLength(6);
    });

    const source = { index: 0, droppableId: "employees" };
    const destination = {
      index: 1,
      droppableId: "employees"
    };

    // @ts-ignore
    wrapper.find("DragDropContext").invoke("onDragEnd")({
      // @ts-ignore
      source,
      destination,
      draggableId
    });

    await waitFor(() => {
      wrapper.update();
      expect(
        findById("column").at(1).find("[data-testid='user']")
      ).toHaveLength(6);
    });
  });

  it("moves an employee from 'employees' to a calltime slot", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("schedule-event-form")).toExist();
    });

    await waitFor(() => {
      wrapper.update();
      expect(
        findById("column").at(2).find("[data-testid='no-employees']")
      ).toExist();
    });

    const source = { index: 0, droppableId: "employees" };
    const destination = {
      index: 0,
      droppableId: "2019-10-31T17:15:43-07:00"
    };

    // @ts-ignore
    wrapper.find("DragDropContext").invoke("onDragEnd")({
      // @ts-ignore
      source,
      destination,
      draggableId
    });

    await waitFor(() => {
      wrapper.update();
      expect(
        findById("column").at(2).find("[data-testid='no-employees']")
      ).not.toExist();
    });
  });
});
