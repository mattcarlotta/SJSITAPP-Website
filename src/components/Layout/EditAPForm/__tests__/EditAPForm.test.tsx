import { ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import waitFor from "@noshot/utils/waitForAct";
import toast from "~components/App/Toast";
import moment from "~utils/momentWithTimezone";
import mockApp from "~utils/mockAxios";
import withProviders from "~utils/withProviders";
import EditAPForm from "../index";

const startMonth = moment().startOf("month").startOf("day").format();
const endMonth = moment().startOf("month").endOf("day").format();
const expirationDate = moment()
  .startOf("month")
  .add(7, "days")
  .startOf("day")
  .format();

const form = {
  seasonId: "20202021",
  startMonth,
  endMonth,
  expirationDate,
  sendEmailNotificationsDate: startMonth,
  notes: "Test",
  sentEmails: false
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

const mockSuccessMessage = "Successfully created AP form!";
mockApp
  .onGet("seasons/all/ids")
  .reply(200, { seasonIds: ["20202021", "20192020"] });

const APIURL = "forms/edit/88";
mockApp.onGet(APIURL).replyOnce(404).onGet(APIURL).reply(200, form);

mockApp.onPut("forms/update").reply(200, { message: mockSuccessMessage });

describe("Edit AP Form", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<EditAPForm />);
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
      expect(mockReplace).toBeCalledWith("/employee/forms/viewall?page=1");
    });
  });

  it("renders the form without errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("ap-form")).toExist();
    });
  });

  it("it calls 'apiQuery' on form submission", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("ap-form")).toExist();
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
      expect(mockPush).toHaveBeenCalledWith("/employee/forms/viewall?page=1");
    });
  });
});
