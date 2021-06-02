import { ReactWrapper } from "enzyme";
import waitFor from "@noshot/utils/waitForAct";
import toast from "~components/App/Toast";
import mockApp from "~utils/mockAxios";
import withProviders from "~utils/withProviders";
import CreateAPForm from "../index";

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

const mockSuccessMessage = "Successfully created AP form!";
mockApp
  .onGet("seasons/all/ids")
  .reply(200, { seasonIds: ["20202021", "20192020"] });

mockApp.onPost("forms/create").reply(200, { message: mockSuccessMessage });

describe("Create AP Form", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<CreateAPForm />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    (toast as jest.Mock).mockClear();
    mockPush.mockClear();
  });

  it("renders without errors", async () => {
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

    findById("seasonId")
      .find("[data-testid='select-text']")
      .first()
      .simulate("click");

    findById("20202021").first().simulate("click");

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

    await setMUIDateField("startMonth", 0);
    await setMUIDateField("endMonth", 1);
    await setMUIDateField("expirationDate", 2);

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
