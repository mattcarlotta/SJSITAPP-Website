import { ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import withRedux, { store } from "~utils/withRedux";
import { signinSession } from "~actions/Auth";
import requiresBasicCredentials from "../index";

const TestPage = () => <p data-testid="authenticated-page">Hello</p>;

const WrappedComponent = requiresBasicCredentials(TestPage);

describe("Requires Basic Credentials", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withRedux(<WrappedComponent />);
  });

  it("initially renders a spinner", () => {
    expect(wrapper.find("[data-testid='loading']")).toExist();
  });

  it("redirects guests to the login page", () => {
    store.dispatch(signinSession({ role: "guest" }));
    wrapper.update();

    const { replace } = useRouter();
    expect(replace).toHaveBeenCalledWith("/employee/login");
  });

  it("allows employees to view the authenticated page", () => {
    store.dispatch(signinSession({ email: "test@test.com", role: "employee" }));
    wrapper.update();

    expect(wrapper.find("[data-testid='authenticated-page']")).toExist();
  });
});
