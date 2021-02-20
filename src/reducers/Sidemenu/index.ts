import { HYDRATE } from "next-redux-wrapper";
import * as types from "~constants";
import { AnyAction } from "~types";

export interface ISidemenuReducerState {
  expandedNodeIds: Array<string>;
  selectedNodeIds: Array<string>;
}

export const initialState: ISidemenuReducerState = {
  expandedNodeIds: [""],
  selectedNodeIds: [""]
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
    case types.SIDEMENU_EXPANDED_TABS: {
      return { ...state, expandedNodeIds: payload };
    }
    case types.SIDEMENU_SELECTED_TABS: {
      return { ...state, selectedNodeIds: payload };
    }
    default: {
      return state;
    }
  }
};

export default sidemenuReducer;
