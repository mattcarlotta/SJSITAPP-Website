import { ReactWrapper } from "enzyme";
import toast from "~components/App/Toast";
import { standardFormat } from "~utils/dateFormats";
import mockApp from "~utils/mockAxios";
import moment from "~utils/momentWithTimezone";
import withProviders from "~utils/withProviders";
import waitFor from "~utils/waitFor";
import CreateSeasonForm from "../index";

const startDate = moment().startOf("day");

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

const APIURL = `seasons/create`;

mockApp
  .onPost(APIURL)
  .replyOnce(404) // throws error
  .onPost(APIURL)
  .reply(200, { message: "Successfully created season!" }); // successfully submits form

describe("CreateSeasonForm", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<CreateSeasonForm />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    (toast as jest.Mock).mockClear();
    mockPush.mockClear();
  });

  it("renders without errors", async () => {
    expect(wrapper.find("form")).toExist();
  });

  it("displays errors when submitting empty fields", async () => {
    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(findById("errors")).toExist();
    });
  });

  it("handles failing to submit the Create Season form", async () => {
    wrapper.find("input[name='startDate']").simulate("click");

    wrapper
      .find(".MuiDialogActions-root")
      .find("button")
      .at(1)
      .simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("input[name='startDate']").prop("value")).toEqual(
        startDate.format(standardFormat)
      );
    });

    wrapper.find("input[name='endDate']").simulate("click");

    wrapper
      .find(".MuiDialogActions-root")
      .find("button")
      .at(3)
      .simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("input[name='endDate']").prop("value")).toEqual(
        startDate.format(standardFormat)
      );
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

  it("handles successfully submitting the Create Season form", async () => {
    wrapper.find("input[name='startDate']").simulate("click");

    wrapper
      .find(".MuiDialogActions-root")
      .find("button")
      .at(1)
      .simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("input[name='startDate']").prop("value")).toEqual(
        startDate.format(standardFormat)
      );
    });

    wrapper.find("input[name='endDate']").simulate("click");

    wrapper
      .find(".MuiDialogActions-root")
      .find("button")
      .at(3)
      .simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("input[name='endDate']").prop("value")).toEqual(
        startDate.format(standardFormat)
      );
    });

    wrapper.find("form").simulate("submit");

    await waitFor(() => {
      wrapper.update();
      expect(toast).toHaveBeenCalledWith({
        type: "success",
        message: "Successfully created season!"
      });
      expect(mockPush).toHaveBeenCalledWith("/employee/seasons/viewall?page=1");
    });
  });
});
