import { mount, ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import { dateTimeFormat, calendarDateFormat } from "~utils/dateFormats";
import mockApp from "~utils/mockAxios";
import moment from "~utils/momentWithTimezone";
import waitFor from "~utils/waitFor";
import ApForm from "../index";

const events = [
  {
    employeeResponse: [],
    eventDate: "2019-09-06T16:30:36.000Z",
    eventType: "Game",
    location: "SAP Center at San Jose",
    notes: "This is a note.",
    opponent: "San Diego Gulls",
    team: "San Jose Barracuda",
    _id: "99"
  }
];

const startMonth = moment().startOf("month");
const endMonth = moment().endOf("month");
const expirationDate = startMonth.add(7, "days");
const sendEmailNotificationsDate = startMonth.add(5, "days");

const form = {
  _id: "88",
  endMonth: endMonth.format(),
  expirationDate: expirationDate.format(),
  notes: "Event notes",
  sendEmailNotificationsDate: sendEmailNotificationsDate.format(),
  sentEmails: true,
  startMonth: startMonth.format()
};

const data = {
  events,
  form
};

const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("~components/App/Toast", () => jest.fn());

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn()
}));

(useRouter as jest.Mock)
  .mockImplementationOnce(() => ({
    route: "/",
    pathname: "",
    query: {},
    asPath: "/",
    push: mockPush,
    replace: mockReplace
  }))
  .mockImplementation(() => ({
    route: "/",
    pathname: "",
    query: { id: "88" },
    asPath: "/",
    push: mockPush,
    replace: mockReplace
  }));

const APIURL = `form/view/88`;
const SUBMISSIONAPI = "form/update/ap";

mockApp
  .onGet(APIURL)
  .replyOnce(404) // throws error
  .onGet(APIURL)
  .replyOnce(200, data) // ap form found
  .onGet(APIURL)
  .replyOnce(200, data) // submitted empty radio field
  .onGet(APIURL)
  .replyOnce(200, data) // fails to submit form
  .onGet(APIURL)
  .reply(200, data); // successfully submits form

mockApp
  .onPut(SUBMISSIONAPI)
  .replyOnce(404)
  .onPut(SUBMISSIONAPI)
  .reply(200, { message: "Successfully submitted AP form!" });

describe("ApForm", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ApForm />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    mockPush.mockClear();
    mockReplace.mockClear();
    (toast as jest.Mock).mockClear();
  });

  it("initally displays a loading indicator", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("loading-events")).toExist();
    });
  });

  it("throws an error when the API fails to fetch data", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
      expect(mockReplace).toHaveBeenCalledWith("/employee/dashboard");
    });
  });

  it("displays the event and form details upon successful API fetch data", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("ap-form")).toExist();
      expect(findById("formatted-date").first().text()).toEqual(
        startMonth.format(calendarDateFormat)
      );
      expect(findById("formatted-date").at(1).text()).toEqual(
        endMonth.format(calendarDateFormat)
      );
      expect(findById("formatted-date").at(2).text()).toEqual(
        expirationDate.format(dateTimeFormat)
      );
    });
  });

  it("displays error when submitting empty fields", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("ap-form")).toExist();
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Please fill out all of the required fields."
      });
      expect(findById("errors")).toExist();
    });
  });

  it("fails to submit the AP form", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("ap-form")).toExist();
    });

    findById("I want to work.")
      .first()
      .simulate("click", { target: { name: "99", value: "I want to work." } });

    await waitFor(() => {
      wrapper.update();
      expect(findById("I want to work.").first().prop("selected")).toBeTruthy();
      wrapper.find("form").simulate("submit");
    });

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
      expect(findById("submitting")).not.toExist();
    });
  });

  it("successfully submits the AP form", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("ap-form")).toExist();
    });

    findById("I want to work.")
      .first()
      .simulate("click", { target: { name: "99", value: "I want to work." } });

    await waitFor(() => {
      wrapper.update();
      expect(findById("I want to work.").first().prop("selected")).toBeTruthy();
      wrapper.find("form").simulate("submit");
    });

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "success",
        message: "Successfully submitted AP form!"
      });
      expect(mockPush).toHaveBeenCalledWith("/employee/dashboard");
    });
  });
});
