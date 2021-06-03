import { mount, ReactWrapper } from "enzyme";
import waitFor from "@noshot/utils/waitForAct";
import SearchBar from "../index";

const initProps = {
  role: "member"
};

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

describe("SearchBar", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<SearchBar {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper).toExist();
  });

  it("pushes the URL to the help page upon selection", async () => {
    wrapper.find("[data-testid='search-icon']").simulate("click");
    wrapper
      .find("[data-testid='How do I change my avatar?']")
      .simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(mockPush).toHaveBeenCalledWith(
        "/employee/help#how-do-i-change-my-avatar"
      );
    });
  });
});
