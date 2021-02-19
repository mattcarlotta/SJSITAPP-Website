import * as constants from "~constants";

/**
 * @function resetMessage - resets all server messages.
 * @returns SERVER_RESET_MESSAGE
 */
export const resetMessage = (): {
  type: typeof constants.SERVER_RESET_MESSAGE;
} => ({
  type: constants.SERVER_RESET_MESSAGE
});

/**
 * @function setMessage - adds a new server message.
 * @param message - a `message` returned from the API server
 * @returns constants.SERVER_MESSAGE and payload
 */
export const setMessage = (
  message: string
): {
  type: typeof constants.SERVER_MESSAGE;
  payload: string;
} => ({
  type: constants.SERVER_MESSAGE,
  payload: message
});

/**
 * @function setError - adds a new server error message.
 * @param err - an `err` message returned from the API server
 * @returns constants.SERVER_ERROR_MESSAGE and payload
 */
export const setError = (
  err: string
): {
  type: typeof constants.SERVER_ERROR_MESSAGE;
  payload: string;
} => ({
  type: constants.SERVER_ERROR_MESSAGE,
  payload: err
});
