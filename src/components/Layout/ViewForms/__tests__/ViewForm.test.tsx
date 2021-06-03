import { mount } from "enzyme";
import waitFor from "@noshot/utils/waitForAct";
import mockApp from "~utils/mockAxios";
import ViewForms from "../index";

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

const APIRUL = "forms/viewall?page=1";
mockApp.onGet(APIRUL).reply(404);
// .onGet(APIRUL)
// .reply(200, { docs: event, totalDocs: 1 });

const wrapper = mount(<ViewForms />);
describe("View Forms", () => {
  it("renders the page without errors", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find("[data-testid='view-forms-page']")).toExist();
    });
  });
});
