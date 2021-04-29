import { ReactWrapper } from "enzyme";
import Layout, { AppLayout } from "../index";
import withProviders, { store } from "~utils/withRedux";

const collapseSideNav = jest.fn();
const setExpandedTabs = jest.fn();
const setSelectedTabs = jest.fn();
const toggleSideNav = jest.fn();
const resetSideMenu = jest.fn();

const initProps = {
  children: <p>Hello</p>,
  collapsed: false,
  collapseSideNav,
  expandedNodeIds: [],
  role: "staff",
  resetSideMenu,
  selectedNodeIds: [],
  setExpandedTabs,
  setSelectedTabs,
  toggleSideNav
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

describe("Layout", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<AppLayout {...initProps} />);
  });

  afterEach(() => {
    collapseSideNav.mockClear();
    setExpandedTabs.mockClear();
    setSelectedTabs.mockClear();
    toggleSideNav.mockClear();
  });

  it("renders without errors", () => {
    expect(wrapper.find("[data-testid='app-layout']")).toExist();
  });

  it("toggles hambuger menu with close and open icon", () => {
    expect(wrapper.find("RiMenuFoldLine")).toExist();
    wrapper.setProps({ collapsed: true });

    expect(wrapper.find("RiMenuUnfoldLine")).toExist();
  });

  it("calls setExpandedTabs and setSelectedTabs on mount", () => {
    expect(setExpandedTabs).toHaveBeenCalledTimes(1);
    expect(setSelectedTabs).toHaveBeenCalledTimes(1);
  });

  it("calls toggleSideNav when the hambuger icon is clicked", () => {
    wrapper.find("[data-testid='hamburger-menu']").first().simulate("click");

    expect(toggleSideNav).toHaveBeenCalledTimes(1);
  });

  it("calls setExpandedTabs when an expandable tree item is clicked", () => {
    Object.assign(window, { innerWidth: 1500 });
    wrapper = withProviders(<Layout />);

    wrapper
      .find(".MuiTreeItem-root")
      .at(1)
      .find(".MuiTypography-root")
      .simulate("click");

    const {
      sidemenu: { expandedNodeIds }
    } = store.getState();

    expect(expandedNodeIds).toEqual(["events"]);
  });
});
