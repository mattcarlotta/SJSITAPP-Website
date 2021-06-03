import { mount } from "enzyme";
import waitFor from "@noshot/utils/waitForAct";
import mockApp from "~utils/mockAxios";
import ViewSeasons from "../index";

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

const APIRUL = "seasons/viewall?page=1";
mockApp.onGet(APIRUL).reply(404);

const wrapper = mount(<ViewSeasons />);
describe("View Seasons", () => {
  it("renders the page without errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='view-seasons-page']")).toExist();
    });
  });
});
