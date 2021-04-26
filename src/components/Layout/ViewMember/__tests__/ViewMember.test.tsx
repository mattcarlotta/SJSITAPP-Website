import { mount, ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import waitFor from "~utils/waitFor";
import mockApp from "~utils/mockAxios";
import ViewMember from "../index";

const mockPush = jest.fn();
const mockReplace = jest.fn();

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
    query: { tab: "profile", id: "88" },
    asPath: "/",
    push: mockPush,
    replace: mockReplace
  }));

const APIURL = "members/view/88";
mockApp.onGet(APIURL).reply(404);

describe("View Member Page", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ViewMember />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    mockPush.mockClear();
    mockReplace.mockClear();
  });

  it("renders the profile tab without errors", () => {
    expect(findById("member-settings-page")).toExist();
  });

  it("toggles tab", async () => {
    findById("tab-availability").at(1).simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(mockPush).toHaveBeenCalledWith("88?tab=availability", undefined, {
        shallow: true
      });
    });
  });
});
