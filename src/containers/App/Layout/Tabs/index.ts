import { TSideMenuNodeIds } from "~types";

export const TABS = [
  "dashboard",
  "events/create",
  "events/edit",
  "events/viewall",
  "forms/create",
  "forms/viewall",
  "members/authorizations/viewall",
  "members/create",
  "members/viewall",
  "schedule",
  "seasons/create",
  "seasons/viewall",
  "mail/create",
  "mail/viewall",
  "settings",
  "help",
  "contact-us",
  "privacy",
  "licensing"
];

export const ROOTTABS = ["events", "forms", "mail", "members", "seasons"];

/**
 * Finds the selected tabs for the side menu from `router.pathname`.
 *
 * @function selectedTab
 * @param path - contains active pathname.
 * @returns array of selected ids
 */
export const selectedTab = (path: string): TSideMenuNodeIds =>
  TABS.filter(tab => path.indexOf(tab) >= 1);

/**
 * Finds the selected tabs for the side menu from `router.pathname`.
 *
 * @function expandedKeys
 * @param path - contains active pathname.
 * @returns array of expanded ids
 */
export const expandedIds = (path: string): TSideMenuNodeIds => {
  const opened = ROOTTABS.find(tab => path.includes(tab));

  return opened ? [opened] : [];
};
