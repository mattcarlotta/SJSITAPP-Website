import * as React from "react";
import {
  FaBalanceScale,
  FaCalendar,
  FaCalendarPlus,
  FaCogs,
  FaConciergeBell,
  FaCopyright,
  FaEdit,
  FaEnvelope,
  FaFileAlt,
  FaFileSignature,
  FaFolder,
  FaFolderOpen,
  FaFolderPlus,
  FaKey,
  FaMailBulk,
  FaQuestionCircle,
  FaUserFriends,
  FaUserPlus,
  FaUsers,
  MdDashboard,
  MdEvent,
  MdEventNote,
  MdNoteAdd,
  MdSettingsInputComponent
} from "~icons";
import { ReactNode } from "~types";

export type TRoutes = Array<{
  icon?: ReactNode;
  nodeId?: string;
  href?: string;
  title?: string;
  testId?: string;
  submenu?: Array<{
    subicon: ReactNode;
    subnodeId: string;
    subhref: string;
    subtitle: string;
    subtestId: string;
  }>;
  divider?: boolean;
}>;

const sharedRoutes: TRoutes = [
  { divider: true, title: "accounting" },
  {
    icon: <FaCogs />,
    nodeId: "settings",
    href: "settings?tab=profile",
    title: "Settings",
    testId: "settings-link"
  },
  {
    icon: <FaQuestionCircle />,
    nodeId: "help",
    href: "help",
    title: "Help",
    testId: "help-link"
  },
  {
    icon: <FaConciergeBell />,
    nodeId: "contact-us",
    href: "contact-us",
    title: "Contact Us",
    testId: "contact-us-link"
  },
  {
    icon: <FaBalanceScale />,
    nodeId: "privacy",
    href: "privacy",
    title: "Privacy",
    testId: "privacy-link"
  },
  {
    icon: <FaCopyright />,
    nodeId: "licensing",
    href: "licensing",
    title: "Licensing",
    testId: "licensing-link"
  }
];

export const StaffRoutes: TRoutes = [
  {
    icon: <MdDashboard />,
    nodeId: "dashboard",
    href: "dashboard",
    title: "Dashboard",
    testId: "dashboard-link"
  },
  {
    icon: <MdEvent />,
    nodeId: "events",
    title: "Events",
    submenu: [
      {
        subicon: <FaCalendarPlus />,
        subnodeId: "events/create",
        subhref: "events/create",
        subtitle: "Create Events",
        subtestId: "events-create-link"
      },
      {
        subicon: <MdEventNote />,
        subnodeId: "events/viewall",
        subhref: "events/viewall?page=1",
        subtitle: "View Events",
        subtestId: "events-viewall-link"
      }
    ]
  },
  {
    icon: <FaFileSignature />,
    nodeId: "forms",
    title: "Forms",
    submenu: [
      {
        subicon: <MdNoteAdd />,
        subnodeId: "forms/create",
        subhref: "forms/create",
        subtitle: "Create Forms",
        subtestId: "create-forms-link"
      },
      {
        subicon: <FaFileAlt />,
        subnodeId: "forms/viewall",
        subhref: "forms/viewall?page=1",
        subtitle: "View Forms",
        subtestId: "forms-viewall-link"
      }
    ]
  },
  {
    icon: <FaEnvelope />,
    nodeId: "mail",
    title: "Mail",
    submenu: [
      {
        subicon: <FaEdit />,
        subnodeId: "mail/create",
        subhref: "mail/create",
        subtitle: "Create Mail",
        subtestId: "create-mail-link"
      },
      {
        subicon: <FaMailBulk />,
        subnodeId: "mail/viewall",
        subhref: "mail/viewall?page=1",
        subtitle: "View Mail",
        subtestId: "mail-viewall-link"
      }
    ]
  },
  {
    icon: <FaUserFriends />,
    nodeId: "members",
    title: "Members",
    submenu: [
      {
        subicon: <FaUserPlus />,
        subnodeId: "members/create",
        subhref: "members/create",
        subtitle: "Create Member",
        subtestId: "create-member-link"
      },
      {
        subicon: <FaKey />,
        subnodeId: "authorizations/viewall",
        subhref: "authorizations/viewall?page=1",
        subtitle: "View Authorizations",
        subtestId: "authorizations-viewall-link"
      },
      {
        subicon: <FaUsers />,
        subnodeId: "members/viewall",
        subhref: "members/viewall?page=1",
        subtitle: "View Members",
        subtestId: "members-viewall-link"
      }
    ]
  },
  {
    icon: <FaCalendar />,
    nodeId: "schedule",
    href: "schedule",
    title: "Schedule",
    testId: "schedule-link"
  },
  {
    icon: <FaFolder />,
    nodeId: "seasons",
    title: "Seasons",
    submenu: [
      {
        subicon: <FaFolderPlus />,
        subnodeId: "seasons/create",
        subhref: "seasons/create",
        subtitle: "Create Season",
        subtestId: "create-season-link"
      },
      {
        subicon: <FaFolderOpen />,
        subnodeId: "seasons/viewall",
        subhref: "seasons/viewall?page=1",
        subtitle: "View Seasons",
        subtestId: "seasons-viewall-link"
      }
    ]
  },
  {
    icon: <MdSettingsInputComponent />,
    nodeId: "services",
    href: "services",
    title: "Services",
    testId: "services-link"
  },
  ...sharedRoutes
];

export const EmployeeRoutes: TRoutes = [
  {
    icon: <MdDashboard />,
    nodeId: "dashboard",
    href: "dashboard",
    title: "Dashboard",
    testId: "dashboard-link"
  },
  {
    icon: <FaCalendar />,
    nodeId: "schedule",
    href: "schedule",
    title: "Schedule",
    testId: "schedule-link"
  },
  ...sharedRoutes
];
