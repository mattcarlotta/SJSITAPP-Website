import { mount, ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import waitFor from "~utils/waitFor";
import { HelpPage } from "../index";

const initProps = {
  role: "staff",
  dispatch: jest.fn()
};

const mockPush = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn()
}));

(useRouter as jest.Mock)
  .mockImplementationOnce(() => ({
    route: "/",
    pathname: "",
    query: {},
    asPath: "/#how-do-i-change-my-password",
    push: mockPush
  }))
  .mockImplementation(() => ({
    route: "/",
    pathname: "",
    query: {},
    asPath: "/",
    push: mockPush
  }));

describe("Help Page", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<HelpPage {...initProps} />);
  });

  afterEach(() => {
    mockPush.mockClear();
  });

  it("sets 'id' state to router's 'hash' prop if they aren't equal", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(
        wrapper.find("div#how-do-i-change-my-password").first().text()
      ).toEqual("How do I change my password?");
    });
  });

  it("pushes a hash to the URL upon search selection", async () => {
    wrapper.find("[data-testid='search-icon']").simulate("click");
    wrapper
      .find("[data-testid='How do I change my avatar?']")
      .simulate("click");

    await waitFor(() => {
      wrapper.update();
      expect(mockPush.mock.calls[1][0]).toEqual("/#how-do-i-change-my-avatar");
    });
  });

  it("renders staff help without errors", () => {
    expect(wrapper.find("[data-testid='help-page']")).toExist();
  });

  it("renders member help without errors", () => {
    wrapper.setProps({ role: "member" });
    expect(wrapper.find("[data-testid='help-page']")).toExist();
  });
});
