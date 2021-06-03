import { mount } from "enzyme";
import waitFor from "@noshot/utils/waitForAct";
import mockApp from "~utils/mockAxios";
import ViewAuthorizations from "../index";

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

const APIRUL = "tokens/viewall?page=1";
mockApp.onGet(APIRUL).reply(404);

const wrapper = mount(<ViewAuthorizations />);
describe("View Events", () => {
  it("renders the table without errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(
        wrapper.find("[data-testid='view-authorizations-page']")
      ).toExist();
    });
  });
});
