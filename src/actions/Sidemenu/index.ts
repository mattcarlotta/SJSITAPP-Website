import {
  SIDEMENU_COLLAPSE,
  SIDEMENU_EXPANDED_TABS,
  SIDEMENU_RESET,
  SIDEMENU_SELECTED_TABS,
  SIDEMENU_TOGGLE
} from "~constants";
import { TSideMenuNodeIds } from "~types";

export type TCollapseSideNav = typeof collapseSideNav;
export type TSetExpandedTabs = typeof setExpandedTabs;
export type TSetSelectedTabs = typeof setSelectedTabs;
export type TResetSideMenu = typeof resetSideMenu;
export type TToggleSideNav = typeof toggleSideNav;

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
 * Resets side menu state.
 *
 * @function resetSideMenu
 * @returns constants.SIDEMENU_RESET
 */
export const resetSideMenu = (): {
  type: typeof SIDEMENU_RESET;
} => ({
  type: SIDEMENU_RESET
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
