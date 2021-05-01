import { mount } from "enzyme";
import mockApp from "~utils/mockAxios";
import waitFor from "~utils/waitFor";
import ViewMail from "../index";

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

const APIRUL = "mail/viewall?page=1";
mockApp.onGet(APIRUL).reply(404);

const wrapper = mount(<ViewMail />);
describe("View Mail", () => {
  it("renders the page without errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='view-mail-page']")).toExist();
    });
  });
});
