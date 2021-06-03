import { ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import waitFor from "@noshot/utils/waitForAct";
import toast from "~components/App/Toast";
import mockApp from "~utils/mockAxios";
import withProviders from "~utils/withProviders";
import EditEventForm from "../index";

const event = {
  _id: "88",
  seasonId: "20202021",
  eventType: "Game",
  location: "Test Location",
  callTimes: [
    "2019-08-09T17:45:26-07:00",
    "2019-08-09T18:15:26-07:00",
    "2019-08-09T18:30:26-07:00",
    "2019-08-09T19:00:26-07:00"
  ],
  uniform: "Teal Jersey",
  team: "San Jose Sharks",
  opponent: "Winnipeg Jets",
  eventDate: "2019-02-10T02:30:31.834+00:00"
};
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("~components/App/Toast");

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn()
}));

(useRouter as jest.Mock).mockImplementation(() => ({
  route: "/",
  pathname: "",
  query: { id: "88" },
  asPath: "/",
  push: mockPush,
  replace: mockReplace
}));

const mockSuccessMessage = "Successfully updated event!";
mockApp
  .onGet("seasons/all/ids")
  .reply(200, { seasonIds: ["20202021", "20192020"] });

mockApp.onGet("teams/all").reply(200, { names: ["Some Team"] });

const APIURL = "events/edit/88";
mockApp.onGet(APIURL).replyOnce(404).onGet(APIURL).reply(200, event);

mockApp.onPut("events/update").reply(200, { message: mockSuccessMessage });

describe("Edit Event Form", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<EditEventForm />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    (toast as jest.Mock).mockClear();
    mockPush.mockClear();
    mockReplace.mockClear();
  });

  it("redirects users when the API to fetch the email fails", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        message: "Request failed with status code 404",
        type: "error"
      });
      expect(mockReplace).toBeCalledWith("/employee/events/viewall?page=1");
    });
  });

  it("renders the form without errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("event-form")).toExist();
    });
  });

  it("it calls 'apiQuery' on form submission", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("event-form")).toExist();
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      expect(findById("submitting")).toExist();
    });

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        message: mockSuccessMessage,
        type: "success"
      });
      expect(mockPush).toHaveBeenCalledWith("/employee/events/viewall?page=1");
    });
  });
});
