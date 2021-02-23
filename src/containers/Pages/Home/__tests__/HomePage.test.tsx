import { ReactWrapper } from "enzyme";
import withRedux, { store } from "~utils/withRedux";
import { signinSession } from "~actions/Auth";
import HomePage from "../index";

describe("Home Page", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withRedux(<HomePage />);
  });

  it("renders without errors", () => {
    expect(wrapper.find("Home")).toExist();
  });

  it("initially renders a spinner for the link", () => {
    expect(wrapper.find("[data-testid='submitting']")).toExist();
  });

  it("renders an 'Employee Login' link for guests", () => {
    store.dispatch(signinSession({ role: "guest" }));
    wrapper.update();

    expect(wrapper.find("[data-testid='home-link']").text()).toContain(
      "Employee Login"
    );
  });

  it("renders a 'View Dashboard' for previous employee sessions", () => {
    store.dispatch(
      signinSession({
        id: "23823838328",
        avatar: "",
        email: "t@t.com",
        firstName: "Example",
        lastName: "User",
        role: "employee"
      })
    );
    wrapper.update();

    expect(wrapper.find("[data-testid='home-link']").text()).toContain(
      "View Dashboard"
    );
  });
});
