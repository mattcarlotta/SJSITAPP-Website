import { ReactWrapper } from "enzyme";
import withRedux, { store } from "~utils/withRedux";
import { signinSession } from "~actions/Auth";
import requiresStaffCredentials from "../index";

const TestPage = () => <p data-testid="authenticated-page">Hello</p>;

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

const WrappedComponent = requiresStaffCredentials(TestPage);

describe("Requires Basic Credentials", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withRedux(<WrappedComponent />);
  });

  afterEach(() => {
    mockReplace.mockClear();
  });

  it("initially renders a spinner", () => {
    expect(wrapper.find("[data-testid='loading']")).toExist();
  });

  it("redirects guests to the login page", () => {
    store.dispatch(signinSession({ role: "guest" }));
    wrapper.update();

    expect(mockReplace).toHaveBeenCalledWith("/employee/login");
  });

  it("redirects members to the login page", () => {
    store.dispatch(
      signinSession({ email: "member@example.com", role: "member" })
    );
    wrapper.update();

    expect(mockReplace).toHaveBeenCalledWith("/employee/login");
  });

  it("allows employees to view the authenticated page", () => {
    store.dispatch(
      signinSession({ email: "staff@example.com", role: "staff" })
    );
    wrapper.update();

    expect(wrapper.find("[data-testid='authenticated-page']")).toExist();
  });
});
