import { ReactWrapper } from "enzyme";
import withRedux, { store } from "~utils/withRedux";
import { signinSession } from "~actions/Auth";
import requiresBasicCredentials from "../index";

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

    expect(mockReplace).toHaveBeenCalledWith("/employee/login");
  });

  it("allows employees to view the authenticated page", () => {
    store.dispatch(signinSession({ email: "test@test.com", role: "member" }));
    wrapper.update();

    expect(wrapper.find("[data-testid='authenticated-page']")).toExist();
  });
});
