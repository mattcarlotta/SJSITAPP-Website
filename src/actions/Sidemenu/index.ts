import {
  SIDEMENU_COLLAPSE,
  SIDEMENU_EXPANDED_TABS,
  SIDEMENU_SELECTED_TABS,
  SIDEMENU_TOGGLE
} from "~constants";
import { TSideMenuNodeIds } from "~types";

/**
 * Collapses the side menu.
 *
 * @function collapseSideNav
 * @returns constants.SIDEMENU_EXPANDED_TABS, payload
 */
export const collapseSideNav = (): {
  type: typeof SIDEMENU_COLLAPSE;
} => ({
  type: SIDEMENU_COLLAPSE
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
 * @function toggleSideNav
 * @returns constants.SIDEMENU_TOGGLE, payload
 */
export const toggleSideNav = (): {
  type: typeof SIDEMENU_TOGGLE;
} => ({
  type: SIDEMENU_TOGGLE
});
