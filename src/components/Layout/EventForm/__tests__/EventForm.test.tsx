import { ReactWrapper } from "enzyme";
import toast from "~components/App/Toast";
import mockApp from "~utils/mockAxios";
import waitFor from "~utils/waitFor";
import withProviders from "~utils/withProviders";
import EventForm from "../index";

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
  eventDate: "2019-02-10T02:30:31.834+00:00",
  employeeResponses: [],
  notes: "Test"
};

jest.mock("~components/App/Toast");

const mockBack = jest.fn();
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    route: "/",
    pathname: "",
    query: {},
    asPath: "/",
    push: mockPush,
    replace: mockReplace,
    back: mockBack
  }))
}));

const apiQuery = jest.fn();

const initProps = {
  apiQuery,
  id: "",
  submitText: "Create"
};

const APIURL = "seasons/all/ids";
const mockErrorMessage = "Unable to reach API";
const mockSuccessMessage = "Successfully created AP form!";
mockApp
  .onGet(APIURL)
  .replyOnce(404) // loading
  .onGet(APIURL)
  .replyOnce(404) // error fetching season ids
  .onGet(APIURL)
  .reply(200, { seasonIds: ["20202021", "20192020"] });

mockApp.onGet("teams/all").reply(200, { names: ["Some Team"] });

apiQuery
  .mockImplementationOnce(() => Promise.reject(mockErrorMessage))
  .mockImplementationOnce(() =>
    Promise.resolve({ data: { message: mockSuccessMessage } })
  );

describe("Event Form", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<EventForm {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    (toast as jest.Mock).mockClear();
    mockPush.mockClear();
    mockReplace.mockClear();
  });

  it("renders a loading placeholder", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("loading-event-form")).toExist();
    });
  });

  it("pushes back to viewall events page on failing to fetch season ids", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
      expect(mockReplace).toHaveBeenCalledWith(
        "/employee/events/viewall?page=1"
      );
    });
  });

  it("doesn't submit the form if form fields have errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("event-form")).toExist();
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("Errors")).toHaveLength(4);
    });
  });

  it("initializes form fields with 'event' data and add/removes call times", async () => {
    wrapper = withProviders(<EventForm {...initProps} event={event} />);

    await waitFor(() => {
      wrapper.update();
      expect(findById("event-form")).toExist();
      expect(
        findById("seasonId-selected-value").first().prop("value")
      ).toBeDefined();
      expect(findById("notes").first().prop("value")).toBeDefined();
      ["eventDate", "callTime"].forEach(field => {
        expect(
          wrapper.find(`input[name='${field}']`).prop("value")
        ).toBeDefined();
      });
    });

    expect(findById("remove-time-slot")).toHaveLength(3);

    findById("remove-time-slot").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("remove-time-slot")).toHaveLength(2);
    });

    findById("add-calltime-field").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("remove-time-slot")).toHaveLength(3);
    });
  });

  describe("Form Submission", () => {
    beforeEach(async () => {
      await waitFor(() => {
        wrapper.update();
        expect(findById("event-form")).toExist();
      });

      findById("seasonId")
        .find("[data-testid='select-text']")
        .first()
        .simulate("click");

      findById("20202021").first().simulate("click");

      findById("uniform")
        .find("[data-testid='select-text']")
        .first()
        .simulate("click");

      findById("Other").first().simulate("click");

      const setMUIDateField = async (
        field: string,
        index: number
      ): Promise<void> => {
        wrapper.find(`input[name='${field}']`).simulate("click");

        await waitFor(() => {
          wrapper.update();
          expect(wrapper.find(".MuiDialog-container")).toExist();
          expect(wrapper.find(".MuiDialog-root")).toExist();
        });

        wrapper
          .find(".MuiDialog-root")
          .at(index)
          .find(".MuiDialogActions-root")
          .find("button")
          .at(1)
          .simulate("click");

        await waitFor(() => {
          wrapper.update();
          expect(wrapper.find(".MuiDialog-container")).not.toExist();
        });

        await waitFor(() => {
          wrapper.update();
          expect(
            wrapper.find(`input[name='${field}']`).prop("value")
          ).toBeDefined();
        });
      };

      await setMUIDateField("eventDate", 0);
      await setMUIDateField("callTime", 1);
    });

    it("on submission error, falls back to the form", async () => {
      wrapper.find("form").simulate("submit");

      await waitFor(() => {
        expect(findById("submitting")).toExist();
      });

      await waitFor(() => {
        wrapper.update();
        expect(toast).toHaveBeenCalledWith({
          message: mockErrorMessage,
          type: "error"
        });
        expect(findById("submitting")).not.toExist();
      });
    });

    it("on successful validation creates a new AP form", async () => {
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
        expect(mockPush).toHaveBeenCalledWith(
          "/employee/events/viewall?page=1"
        );
      });
    });
  });
});
