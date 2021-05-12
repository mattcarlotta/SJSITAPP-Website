import { mount, ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
import moment from "~utils/momentWithTimezone";
import mockApp from "~utils/mockAxios";
import waitFor from "~utils/waitFor";
import ViewEmail from "../index";

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

const mockBack = jest.fn();
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
  replace: mockReplace,
  back: mockBack
}));

const APIURL = "mail/edit/88";
mockApp
  .onGet(APIURL)
  .replyOnce(404) // loading
  .onGet(APIURL)
  .replyOnce(404) // error fetching email
  .onGet(APIURL)
  .reply(200, form);

describe("View Email", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ViewEmail />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    (toast as jest.Mock).mockClear();
    mockReplace.mockClear();
    mockBack.mockClear();
  });

  it("renders a loading placeholder", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("loading-email")).toExist();
    });
  });

  it("pushes back to viewall mail page on failing to fetch email", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "error",
        message: "Request failed with status code 404"
      });
      expect(mockReplace).toHaveBeenCalledWith("/employee/mail/viewall?page=1");
    });
  });

  it("loads and previews the email", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("email-preview")).toExist();
    });
  });

  it("navigates back to the previous page", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(findById("email-preview")).toExist();
    });

    findById("view-mail-link").simulate("click");

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
