import * as constants from "~constants";

export interface AppLoadingAction {
  type: typeof constants.APP_LOADING;
}

export interface AppLoadedAction {
  type: typeof constants.APP_LOADED;
}

/**
 * Sets the app state to loading
 *
 * @function appLoading
 * @returns {object}
 */
export const appLoading = (): AppLoadingAction => ({
  type: constants.APP_LOADING
});

/**
 * Sets the app state to loaded
 *
 * @function appLoaded
 * @returns {object}
 */
export const appLoaded = (): AppLoadedAction => ({
  type: constants.APP_LOADED
});
