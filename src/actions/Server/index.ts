import * as constants from "~constants";
import {
  IResetMessageAction,
  ISetMessageAction,
  ISetErrorAction
} from "./types";

/**
 * @function resetMessage - resets all server messages.
 * @returns SERVER_RESET_MESSAGE
 */
export const resetMessage: IResetMessageAction = () => ({
  type: constants.SERVER_RESET_MESSAGE
});

/**
 * @function setMessage - adds a new server message.
 * @param message - a `message` returned from the API server
 * @returns constants.SERVER_MESSAGE and payload
 */
export const setMessage: ISetMessageAction = message => ({
  type: constants.SERVER_MESSAGE,
  payload: message
});

/**
 * @function setError - adds a new server error message.
 * @param err - an `err` message returned from the API server
 * @returns constants.SERVER_ERROR_MESSAGE and payload
 */
export const setError: ISetErrorAction = err => ({
  type: constants.SERVER_ERROR_MESSAGE,
  payload: err
});
