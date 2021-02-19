import * as constants from "~constants";

export interface IResetMessageAction {
  (): { type: typeof constants.SERVER_RESET_MESSAGE };
}

export interface ISetMessageAction {
  (message: string): {
    type: typeof constants.SERVER_MESSAGE;
    payload: string;
  };
}

export interface ISetErrorAction {
  (err: string): {
    type: typeof constants.SERVER_ERROR_MESSAGE;
    payload: string;
  };
}
