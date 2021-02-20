import {
  SIDEMENU_EXPANDED_TABS,
  SIDEMENU_SELECTED_TABS,
  SIDEMENU_TOGGLE
} from "~constants";
import { TSideMenuNodeIds } from "~types";

/**
 * Sets expanded tabs for the side menu.
 *
 * @function setExpandedTabs
 * @param payload - contains active side menu `nodeIds`.
 * @returns constants.SIDEMENU_EXPANDED_TABS, payload
 */
export const setExpandedTabs = (
  payload: TSideMenuNodeIds
): {
  type: typeof SIDEMENU_EXPANDED_TABS;
  payload: TSideMenuNodeIds;
} => ({
  type: SIDEMENU_EXPANDED_TABS,
  payload
});

/**
 * Sets the selected tabs for the side menu.
 *
 * @function setSelectedTabs
 * @param payload - contains active side menu `nodeIds`.
 * @returns constants.SIDEMENU_SELECTED_TABS, payload
 */
export const setSelectedTabs = (
  payload: TSideMenuNodeIds
): {
  type: typeof SIDEMENU_SELECTED_TABS;
  payload: TSideMenuNodeIds;
} => ({
  type: SIDEMENU_SELECTED_TABS,
  payload
});

/**
 * Toggles side menu collapsing.
 *
 * @function setExpandedTabs
 * @returns constants.SIDEMENU_TOGGLE, payload
 */
export const toggleSideNav = (): {
  type: typeof SIDEMENU_TOGGLE;
} => ({
  type: SIDEMENU_TOGGLE
});
