import { ReactWrapper } from "enzyme";
import withProviders from "~utils/withProviders";
import { ReactNode } from "~types";
import { UserAvatar } from "../index";

jest.mock("next/link", () => ({ children }: { children: ReactNode }) =>
  children
);

const signoutUserSession = jest.fn();

const initProps = {
  avatar: "",
  firstName: "First",
  lastName: "Last",
  role: "employee",
  signoutUserSession
};

describe("UserAvatar", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<UserAvatar {...initProps} />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='account-dropdown']")).toExist();
  });

  it("opens and closes a user menu", async () => {
    jest.useFakeTimers();
    wrapper.find("[data-testid='account-dropdown']").first().simulate("click");

    expect(wrapper.find("[data-testid='user-menu']")).toExist();
    expect(wrapper.find("[data-testid='users-name']").first().text()).toEqual(
      "First Last"
    );

    wrapper.find("ForwardRef(SimpleBackdrop)").simulate("click");
    jest.runOnlyPendingTimers();

    wrapper.update();
    expect(wrapper.find("[data-testid='user-menu']")).not.toExist();
  });
});
