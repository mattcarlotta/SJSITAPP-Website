import { HYDRATE } from "next-redux-wrapper";
import * as constants from "~constants";
import { AnyAction } from "~types";

export interface ISidemenuReducerState {
  collapsed: boolean;
  expandedNodeIds: Array<string>;
  selectedNodeIds: Array<string>;
}

export const initialState: ISidemenuReducerState = {
  collapsed: false,
  expandedNodeIds: [],
  selectedNodeIds: []
};

/**
 * @function sidemenuReducer
 * @param {object} state - an object containing current user session state.
 * @param {object} action - type and payload to be reduced.
 * @returns {IAuthReducerState} { nodeIds: [string]; }
 */
const sidemenuReducer = (
  state: ISidemenuReducerState = initialState,
  { payload, type }: AnyAction
): ISidemenuReducerState => {
  switch (type) {
    case HYDRATE: {
      return { ...state, ...payload.sidemenu };
    }
    case constants.SIDEMENU_COLLAPSE: {
      return { ...state, collapsed: true };
    }
    case constants.SIDEMENU_EXPANDED_TABS: {
      return { ...state, expandedNodeIds: payload };
    }
    case constants.SIDEMENU_SELECTED_TABS: {
      return { ...state, selectedNodeIds: payload };
    }
    case constants.SIDEMENU_TOGGLE: {
      return { ...state, collapsed: !state.collapsed };
    }
    case constants.SIDEMENU_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default sidemenuReducer;
