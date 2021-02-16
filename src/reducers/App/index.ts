import { HYDRATE } from "next-redux-wrapper";
import * as types from "~constants";
import { AnyAction } from "~types";

export interface IAppReducerState {
  isLoading: boolean;
}

export const initialState: IAppReducerState = {
  isLoading: true
};

/**
 * @function appReducer
 * @param {object} state - an object containing current app session state.
 * @param {object} action - type and payload to be reduced.
 * @returns {IAppReducerState} { isLoading: boolean }
 */
const appReducer = (
  state: IAppReducerState = initialState,
  { payload, type }: AnyAction
): IAppReducerState => {
  switch (type) {
    case HYDRATE: {
      return { ...state, ...payload.app };
    }
    case types.APP_LOADING: {
      return { ...state, isLoading: true };
    }
    case types.APP_LOADED: {
      return { ...state, isLoading: false };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
