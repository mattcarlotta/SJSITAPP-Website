import mockApp from "~utils/mockAxios";
import waitFor from "~utils/waitFor";
import withProviders from "~utils/withProviders";
import ViewEvents from "../index";

const mockBack = jest.fn();
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    route: "/",
    pathname: "",
    query: { page: 1 },
    asPath: "/",
    push: mockPush,
    replace: mockReplace,
    back: mockBack
  }))
}));

const event = [
  {
    callTimes: [
      "2021-04-22T18:30:25-07:00",
      "2021-04-22T18:45:42-07:00",
      "2021-04-22T19:00:47-07:00"
    ],
    employeeResponses: [],
    eventDate: "2021-07-02T02:30:00.000Z",
    eventType: "Game",
    id: "608253a62f8e84ec172aa0b4",
    location: "SAP Center at San Jose",
    notes: "",
    opponent: "Calgary Flames",
    scheduledIds: [],
    seasonId: "20212022",
    sentEmailReminders: false,
    team: "San Jose Sharks",
    uniform: "Sharks Teal Jersey",
    _id: "608253a62f8e84ec172aa0b4"
  },
  {
    callTimes: [
      "2021-04-20T18:30:04-07:00",
      "2021-04-20T18:45:50-07:00",
      "2021-04-20T19:00:56-07:00"
    ],
    employeeResponses: [],
    eventDate: "2021-07-01T02:30:00.000Z",
    eventType: "Game",
    id: "607f8d3b14aaba53ca79061e",
    location: "SAP Center at San Jose",
    notes: "",
    opponent: "Carolina Hurricanes",
    scheduledIds: [],
    seasonId: "20212022",
    sentEmailReminders: false,
    team: "San Jose Sharks",
    uniform: "Sharks Black Jersey",
    _id: "607f8d3b14aaba53ca79061e"
  }
];

const APIRUL = "events/viewall?page=1";
mockApp
  .onGet(APIRUL)
  .reply(404)
  .onGet(APIRUL)
  .reply(200, { docs: event, totalDocs: 1 });

const originalError = global.console.error;

const wrapper = withProviders(<ViewEvents />);
describe("View Events", () => {
  beforeAll(() => {
    global.console.error = (...args: any): void => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  });

  afterAll(() => {
    global.console.error = originalError;
  });

  it("renders the page without errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='view-events-page']")).toExist();
    });
  });

  it("renders the table without errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='data-table']")).toExist();
    });
  });
});
