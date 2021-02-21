import * as React from "react";
import moment from "moment";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { MdDashboard } from "@react-icons/all-files/md/MdDashboard";
import { MdExpandMore } from "@react-icons/all-files/md/MdExpandMore";
import { MdChevronRight } from "@react-icons/all-files/md/MdChevronRight";
import { MdEvent } from "@react-icons/all-files/md/MdEvent";
import { MdEventNote } from "@react-icons/all-files/md/MdEventNote";
import { MdNoteAdd } from "@react-icons/all-files/md/MdNoteAdd";
import { FaBalanceScale } from "@react-icons/all-files/fa/FaBalanceScale";
import { FaCalendar } from "@react-icons/all-files/fa/FaCalendar";
import { FaCalendarPlus } from "@react-icons/all-files/fa/FaCalendarPlus";
import { FaCogs } from "@react-icons/all-files/fa/FaCogs";
import { FaConciergeBell } from "@react-icons/all-files/fa/FaConciergeBell";
import { FaCopyright } from "@react-icons/all-files/fa/FaCopyright";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaFileAlt } from "@react-icons/all-files/fa/FaFileAlt";
import { FaFileSignature } from "@react-icons/all-files/fa/FaFileSignature";
import { FaFolder } from "@react-icons/all-files/fa/FaFolder";
import { FaFolderOpen } from "@react-icons/all-files/fa/FaFolderOpen";
import { FaFolderPlus } from "@react-icons/all-files/fa/FaFolderPlus";
import { FaKey } from "@react-icons/all-files/fa/FaKey";
import { FaMailBulk } from "@react-icons/all-files/fa/FaMailBulk";
import { FaPaperPlane } from "@react-icons/all-files/fa/FaPaperPlane";
import { FaQuestionCircle } from "@react-icons/all-files/fa/FaQuestionCircle";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { FaUserPlus } from "@react-icons/all-files/fa/FaUserPlus";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import Divider from "~components/Layout/Divider";
import Legal from "~components/Layout/Legal";
import Tree from "~components/Layout/Tree";
import NavLink from "~components/Navigation/NavLink";
import NavTitle from "~components/Navigation/NavTitle";
import { FC, TSideMenuNodeIds } from "~types";

export type TSideMenuProps = {
  collapsed: boolean;
  expandedNodeIds: TSideMenuNodeIds;
  handleSelect: (_: any, nodeIds: TSideMenuNodeIds) => void;
  handleToggle: (_: any, nodeIds: TSideMenuNodeIds) => void;
  selectedNodeIds: TSideMenuNodeIds;
};

const SideMenu: FC<TSideMenuProps> = ({
  collapsed,
  handleSelect,
  handleToggle,
  expandedNodeIds,
  selectedNodeIds
}) => (
  <Tree collapsed={collapsed}>
    <TreeView
      defaultCollapseIcon={<MdExpandMore />}
      defaultExpandIcon={<MdChevronRight />}
      expanded={expandedNodeIds}
      selected={selectedNodeIds}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <TreeItem
        icon={<MdDashboard />}
        nodeId="dashboard"
        label={
          <NavLink
            green
            nounderline
            padding="2px 0px"
            marginRight="0px"
            width="100%"
            dataTestId="dashboard-link"
            href="/employee/dashboard"
          >
            Dashboard
          </NavLink>
        }
      />
      <TreeItem
        icon={<MdEvent />}
        nodeId="events"
        label={<NavTitle>Events</NavTitle>}
      >
        <TreeItem
          icon={<FaCalendarPlus />}
          nodeId="events/create"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="events-create-link"
              href="/employee/events/create"
            >
              Create Events
            </NavLink>
          }
        />
        <TreeItem
          icon={<MdEventNote />}
          nodeId="events/viewall"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="events-viewall-link"
              href="/employee/events/viewall?page=1"
            >
              View Events
            </NavLink>
          }
        />
      </TreeItem>
      <TreeItem
        icon={<FaFileSignature />}
        nodeId="forms"
        label={<NavTitle>Forms</NavTitle>}
      >
        <TreeItem
          icon={<MdNoteAdd />}
          nodeId="forms/create"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="create-forms-link"
              href="/employee/forms/create"
            >
              Create Forms
            </NavLink>
          }
        />
        <TreeItem
          icon={<FaFileAlt />}
          nodeId="forms/viewall"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="forms-viewall-link"
              href="/employee/forms/viewall?page=1"
            >
              View Forms
            </NavLink>
          }
        />
      </TreeItem>
      <TreeItem
        icon={<FaEnvelope />}
        nodeId="mail"
        label={<NavTitle>Mail</NavTitle>}
      >
        <TreeItem
          icon={<FaPaperPlane />}
          nodeId="mail/create"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="create-mail-link"
              href="/employee/mail/create"
            >
              Send Mail
            </NavLink>
          }
        />
        <TreeItem
          icon={<FaMailBulk />}
          nodeId="mail/viewall"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="view-mail-link"
              href="/employee/mail/viewall?page=1"
            >
              View Mail
            </NavLink>
          }
        />
      </TreeItem>
      <TreeItem
        icon={<FaUserFriends />}
        nodeId="members"
        label={<NavTitle>Members</NavTitle>}
      >
        <TreeItem
          icon={<FaUserPlus />}
          nodeId="members/create"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="create-members-link"
              href="/employee/members/create"
            >
              Create Member
            </NavLink>
          }
        />
        <TreeItem
          icon={<FaKey />}
          nodeId="members/authorizations/viewall"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="members-authorization-link"
              href="/employee/members/authorizations/viewall?page=1"
            >
              View Authorizations
            </NavLink>
          }
        />
        <TreeItem
          icon={<FaUsers />}
          nodeId="members/viewall"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="members-viewall-link"
              href="/employee/members/viewall?page=1"
            >
              View Members
            </NavLink>
          }
        />
      </TreeItem>
      <TreeItem
        icon={<FaCalendar />}
        nodeId="schedule"
        label={
          <NavLink
            green
            nounderline
            padding="2px 0px"
            marginRight="0px"
            width="100%"
            dataTestId="schedule-link"
            href="/employee/schedule"
          >
            Schedule
          </NavLink>
        }
      />
      <TreeItem
        icon={<FaFolder />}
        nodeId="seasons"
        label={<NavTitle>Seasons</NavTitle>}
      >
        <TreeItem
          icon={<FaFolderPlus />}
          nodeId="seasons/create"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="seasons-create-link"
              href="/employee/seasons/create"
            >
              Create Season
            </NavLink>
          }
        />
        <TreeItem
          icon={<FaFolderOpen />}
          nodeId="seasons/viewall"
          label={
            <NavLink
              green
              nounderline
              padding="2px 0px"
              marginRight="0px"
              width="100%"
              dataTestId="view-seasons-link"
              href="/employee/seasons/viewall?page=1"
            >
              View Seasons
            </NavLink>
          }
        />
      </TreeItem>
      <Divider margin="20px 0 20px -20px" />
      <TreeItem
        nodeId="settings"
        icon={<FaCogs />}
        label={
          <NavLink
            green
            nounderline
            padding="2px 0px"
            marginRight="0px"
            width="100%"
            dataTestId="settings-link"
            href="/employee/settings"
          >
            Settings
          </NavLink>
        }
      />
      <TreeItem
        icon={<FaQuestionCircle />}
        nodeId="help"
        label={
          <NavLink
            green
            nounderline
            padding="2px 0px"
            marginRight="0px"
            width="100%"
            dataTestId="help-link"
            href="/employee/help"
          >
            Help
          </NavLink>
        }
      />
      <TreeItem
        icon={<FaConciergeBell />}
        nodeId="contact-us"
        label={
          <NavLink
            green
            nounderline
            padding="2px 0px"
            marginRight="0px"
            width="100%"
            dataTestId="contact-us-link"
            href="/employee/contact-us"
          >
            Contact Us
          </NavLink>
        }
      />
      <TreeItem
        icon={<FaBalanceScale />}
        nodeId="privacy"
        label={
          <NavLink
            green
            nounderline
            padding="2px 0px"
            marginRight="0px"
            width="100%"
            dataTestId="privacy-link"
            href="/employee/privacy"
          >
            Privacy Policy
          </NavLink>
        }
      />
      <TreeItem
        icon={<FaCopyright />}
        nodeId="licensing"
        label={
          <NavLink
            green
            nounderline
            padding="2px 0px"
            marginRight="0px"
            width="100%"
            dataTestId="licensing-link"
            href="/employee/licensing"
          >
            Licensing
          </NavLink>
        }
      />
    </TreeView>
    <Legal>© 2019-{moment().format("YYYY")} Matt Carlotta</Legal>
  </Tree>
);

export default SideMenu;
