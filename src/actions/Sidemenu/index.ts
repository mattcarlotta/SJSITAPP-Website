import { SIDEMENU_EXPANDED_TABS, SIDEMENU_SELECTED_TABS } from "~constants";
import { TSideMenuNodeIds } from "~types";

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
