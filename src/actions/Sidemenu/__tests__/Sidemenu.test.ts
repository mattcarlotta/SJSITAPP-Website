import * as constants from "~constants";
import * as actions from "../index";

const payload = ["1"];

describe("Sidemenu Actions", () => {
  it("collapseSideNav returns SIDEMENU_COLLAPSE", () => {
    const value = actions.collapseSideNav();

    expect(value).toEqual({ type: constants.SIDEMENU_COLLAPSE });
  });

  it("setExpandedTabs returns SIDEMENU_EXPANDED_TABS and nodeIds as payload", () => {
    const value = actions.setExpandedTabs(payload);

    expect(value).toEqual({ type: constants.SIDEMENU_EXPANDED_TABS, payload });
  });

  it("setSelectedTabs returns SIDEMENU_SELECTED_TABS and nodeIds as payload", () => {
    const value = actions.setSelectedTabs(payload);

    expect(value).toEqual({
      type: constants.SIDEMENU_SELECTED_TABS,
      payload
    });
  });

  it("toggleSideNav returns SIDEMENU_TOGGLE", () => {
    const value = actions.toggleSideNav();

    expect(value).toEqual({ type: constants.SIDEMENU_TOGGLE });
  });
});
