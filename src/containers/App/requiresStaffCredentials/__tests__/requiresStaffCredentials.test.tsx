import { ReactWrapper } from "enzyme";
import { useRouter } from "next/router";
import withRedux, { store } from "~utils/withRedux";
import { signinSession } from "~actions/Auth";
import requiresStaffCredentials from "../index";

const TestPage = () => <p data-testid="authenticated-page">Hello</p>;

const { replace } = useRouter();

const WrappedComponent = requiresStaffCredentials(TestPage);

describe("Requires Basic Credentials", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withRedux(<WrappedComponent />);
  });

  afterEach(() => {
    (replace as jest.Mock).mockClear();
  });

  it("initially renders a spinner", () => {
    expect(wrapper.find("[data-testid='loading']")).toExist();
  });

  it("redirects guests to the login page", () => {
    store.dispatch(signinSession({ role: "guest" }));
    wrapper.update();

    expect(replace).toHaveBeenCalledWith("/employee/login");
  });

  it("redirects members to the login page", () => {
    store.dispatch(
      signinSession({ email: "member@example.com", role: "member" })
    );
    wrapper.update();

    expect(replace).toHaveBeenCalledWith("/employee/login");
  });

  it("allows employees to view the authenticated page", () => {
    store.dispatch(
      signinSession({ email: "staff@example.com", role: "staff" })
    );
    wrapper.update();

    expect(wrapper.find("[data-testid='authenticated-page']")).toExist();
  });
});
