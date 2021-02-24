import { ReactWrapper } from "enzyme";
import Layout, { AppLayout } from "../index";
import withProviders, { store } from "~utils/withRedux";

const setExpandedTabs = jest.fn();
const setSelectedTabs = jest.fn();
const toggleSideNav = jest.fn();

const initProps = {
  children: <p>Hello</p>,
  collapsed: false,
  expandedNodeIds: [],
  selectedNodeIds: [],
  setExpandedTabs,
  setSelectedTabs,
  toggleSideNav
};

describe("Layout", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = withProviders(<AppLayout {...initProps} />);
  });

  afterEach(() => {
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

  it("calls setExpandedTabs when a expandable tree item is clicked", () => {
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
