import { ReactWrapper } from "enzyme";
import waitFor from "@noshot/utils/waitForAct";
import toast from "~components/App/Toast";
import mockApp from "~utils/mockAxios";
import withProviders from "~utils/withProviders";
import ViewServices from "../index";

const service = {
  _id: "88",
  automatedOnline: true,
  emailOnline: true,
  eventOnline: true,
  formReminderOnline: true,
  scheduleOnline: true,
  eventDay: "16th",
  eventMonth: "April",
  eventTime: "07:59 am",
  formReminderDay: "5th",
  formReminderMonth: "April",
  formReminderTime: "05:00 pm",
  scheduleDay: "15th",
  scheduleMonth: "April",
  scheduleTime: "06:00 pm"
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

const APIURL = "service/view";
mockApp
  .onGet(APIURL)
  .replyOnce(404) // placeholder
  .onGet(APIURL)
  .replyOnce(404) // push back to dashboard
  .onGet(APIURL)
  .replyOnce(200) // displays settings without options
  .onGet(APIURL)
  .replyOnce(200) // creating services failed
  .onGet(APIURL)
  .replyOnce(200) // creating services success
  .onGet(APIURL)
  .reply(200, service);

const CREATESERVICE = "/service/create";
const successCreateMessage = "Successfully created services.";
mockApp
  .onPost(CREATESERVICE)
  .replyOnce(404)
  .onPost(CREATESERVICE)
  .reply(200, { message: successCreateMessage });

const UPDATESERVICE = "/service/update";
const successUpdateMessage = "Successfully updated services.";
mockApp
  .onPut(UPDATESERVICE)
  .replyOnce(404)
  .onPut(UPDATESERVICE)
  .reply(200, { message: successUpdateMessage });

describe("View Services", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  let setMUIField: (field: string, index: number) => Promise<void>;
  beforeEach(() => {
    wrapper = withProviders(<ViewServices />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
    setMUIField = async (field: string, index: number): Promise<void> => {
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
  });

  afterEach(() => {
    (toast as jest.Mock).mockClear();
    mockReplace.mockClear();
  });

  it("renders a loading placeholder", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("loading-service-form")).toExist();
    });
  });

  it("pushes back to dashboard when API request fails", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
      expect(mockReplace).toHaveBeenCalledWith("/employee/dashboard");
    });
  });

  it("renders a message when services haven't been created yet", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("current-settings")).toExist();
      expect(findById("no-services-message")).toExist();
    });

    findById("edit-settings-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("services-settings-form")).toExist();
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(findById("errors")).toExist();
    });
  });

  it("handles failed requests to create services", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("current-settings")).toExist();
      expect(findById("edit-settings-button")).toExist();
    });

    findById("edit-settings-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("services-settings-form")).toExist();
    });

    await setMUIField("formReminderTime", 0);
    await setMUIField("eventTime", 1);
    await setMUIField("scheduleTime", 2);

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
    });
  });

  it("handles successful requests to create services", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("current-settings")).toExist();
      expect(findById("edit-settings-button")).toExist();
    });

    findById("edit-settings-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("services-settings-form")).toExist();
    });

    await setMUIField("formReminderTime", 0);
    await setMUIField("eventTime", 1);
    await setMUIField("scheduleTime", 2);

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "success",
        message: successCreateMessage
      });
    });
  });

  it("renders services settings when they've been previously created", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("current-settings")).toExist();
      expect(findById("no-services-message")).not.toExist();
    });
  });

  it("handles failed requests to update services", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("current-settings")).toExist();
      expect(findById("edit-settings-button")).toExist();
    });

    findById("edit-settings-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("services-settings-form")).toExist();
    });

    await setMUIField("formReminderTime", 0);
    await setMUIField("eventTime", 1);
    await setMUIField("scheduleTime", 2);

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
    });
  });

  it("handles successful requests to update services", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("current-settings")).toExist();
      expect(findById("edit-settings-button")).toExist();
    });

    findById("edit-settings-button").first().simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(findById("services-settings-form")).toExist();
    });

    await setMUIField("formReminderTime", 0);
    await setMUIField("eventTime", 1);
    await setMUIField("scheduleTime", 2);

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "success",
        message: successUpdateMessage
      });
    });
  });
});
