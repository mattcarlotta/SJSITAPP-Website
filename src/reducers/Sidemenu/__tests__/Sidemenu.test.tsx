import { HYDRATE } from "next-redux-wrapper";
import * as constants from "~constants";
import sidemenuReducer, { initialState } from "../index";

const expandedNodeIds = ["events"];
const selectedNodeIds = ["events/viewall"];

const payload = {
  sidemenu: {
    collapsed: true,
    expandedNodeIds,
    selectedNodeIds
  }
};

describe("Server Reducer", () => {
  it("initially matches the initialState pattern", () => {
    expect(sidemenuReducer(undefined, { payload: {}, type: "" })).toEqual(
      initialState
    );
  });

  it("rehydrates", () => {
    const state = sidemenuReducer(undefined, {
      type: HYDRATE,
      payload
    });

    expect(state).toEqual(payload.sidemenu);
  });

  it("collapses sidemenu", () => {
    const state = sidemenuReducer(undefined, {
      type: constants.SIDEMENU_COLLAPSE
    });

    expect(state).toEqual({ ...initialState, collapsed: true });
  });

  it("sets expanded tabs", () => {
    const state = sidemenuReducer(undefined, {
      type: constants.SIDEMENU_EXPANDED_TABS,
      payload: expandedNodeIds
    });

    expect(state).toEqual({ ...initialState, expandedNodeIds });
  });

  it("sets selected tabs", () => {
    const state = sidemenuReducer(undefined, {
      type: constants.SIDEMENU_SELECTED_TABS,
      payload: selectedNodeIds
    });

    expect(state).toEqual({ ...initialState, selectedNodeIds });
  });

  it("toggles the sidemenu collapsed state", () => {
    const state = sidemenuReducer(undefined, {
      type: constants.SIDEMENU_TOGGLE
    });

    expect(state).toEqual({ ...initialState, collapsed: true });
  });

  it("resets state when user is logged out", () => {
    let state = sidemenuReducer(undefined, {
      type: constants.SIDEMENU_EXPANDED_TABS,
      payload: expandedNodeIds
    });

    expect(state).toEqual({ ...initialState, expandedNodeIds });

    state = sidemenuReducer(state, {
      type: constants.SIDEMENU_RESET
    });

    expect(state).toEqual(initialState);
  });
});
