import { HYDRATE } from "next-redux-wrapper";
import * as constants from "~constants";
import { AnyAction } from "~types";

export interface IServerReducerState {
  error: string;
  message: string;
}

export const initialState: IServerReducerState = {
  error: "",
  message: ""
};

/**
 * @function serverReducer
 * @param {object} state - an object containing error or server messages.
 * @param {object} action - type and payload to be reduced.
 * @returns {IServerReducerState} { error:string, message: string }.
 */
const serverReducer = (
  state: IServerReducerState = initialState,
  { payload, type }: AnyAction
): IServerReducerState => {
  switch (type) {
    case HYDRATE:
      return { ...state, ...payload.server };
    case constants.SERVER_RESET:
      return initialState;
    case constants.SERVER_ERROR:
      return { ...state, error: payload };
    case constants.SERVER_MESSAGE:
      return { ...state, message: payload };
    default:
      return state;
  }
};

export default serverReducer;
