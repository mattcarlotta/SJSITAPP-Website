import { mount, ReactWrapper } from "enzyme";
import Navbar from "../index";

const collapseSideNav = jest.fn();
const toggleSideNav = jest.fn();

const initProps = {
  collapsed: false,
  collapseSideNav,
  toggleSideNav,
  pathname: "/",
  children: <p>Test</p>
};

describe("Navbar", () => {
  let wrapper: ReactWrapper;
  let findById: (id: string) => ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<Navbar {...initProps} />);
    findById = id => wrapper.find(`[data-testid='${id}']`);
  });

  afterEach(() => {
    toggleSideNav.mockClear();
  });

  it("initially renders the drawer for mobile", () => {
    expect(findById("drawer-sidemenu")).toExist();
  });

  it("calls toggleSideNav on drawer close", () => {
    findById("hamburger-menu").first().simulate("click");
    expect(toggleSideNav).toHaveBeenCalledTimes(1);
  });

  it("collapsed the sidemenu", () => {
    Object.assign(window, { innerWidth: 1500 });
    wrapper = mount(<Navbar {...initProps} collapsed />);

    expect(findById("fixed-sidemenu-closed")).toExist();
  });

  it("renders the fixed side menu screens larger than 1400px", () => {
    Object.assign(window, { innerWidth: 1500 });
    wrapper = mount(<Navbar {...initProps} />);

    expect(findById("fixed-sidemenu-open")).toExist();
  });
});
