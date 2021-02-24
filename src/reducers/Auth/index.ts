import { HYDRATE } from "next-redux-wrapper";
import * as types from "~constants";
import { AnyAction } from "~types";

export interface IAuthReducerState {
  id: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isCollapsed: boolean;
}

export const initialState: IAuthReducerState = {
  id: "",
  avatar: "",
  email: "",
  firstName: "",
  lastName: "",
  role: "",
  isCollapsed: false
};

/**
 * @function authReducer
 * @param {object} state - an object containing current user session state.
 * @param {object} action - type and payload to be reduced.
 * @returns {IAuthReducerState} { id: string; avatar: string; email: string; firstName: string;  lastName: string; role: string; isCollapsed: boolean; }
 */
const authReducer = (
  state: IAuthReducerState = initialState,
  { payload, type }: AnyAction
): IAuthReducerState => {
  switch (type) {
    case HYDRATE: {
      return { ...state, ...payload.auth };
    }
    case types.USER_UPDATE_SESSION:
    case types.USER_SET_AVATAR:
    case types.USER_SET_SESSION: {
      return { ...state, ...payload };
    }
    case types.USER_REMOVE_SESSION: {
      return { ...initialState, role: "guest" };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
