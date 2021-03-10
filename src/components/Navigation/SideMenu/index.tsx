import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Divider from "~components/Layout/Divider";
import Legal from "~components/Layout/Legal";
import Tree from "~components/Layout/Tree";
import NavLink from "~components/Navigation/NavLink";
import NavTitle from "~components/Navigation/NavTitle";
import {
  FaBalanceScale,
  FaCalendar,
  FaCalendarPlus,
  FaCogs,
  FaConciergeBell,
  FaCopyright,
  FaEnvelope,
  FaFileAlt,
  FaFileSignature,
  FaFolder,
  FaFolderOpen,
  FaFolderPlus,
  FaKey,
  FaMailBulk,
  FaPaperPlane,
  FaQuestionCircle,
  FaUserFriends,
  FaUserPlus,
  FaUsers,
  MdDashboard,
  MdExpandMore,
  MdChevronRight,
  MdEvent,
  MdEventNote,
  MdNoteAdd
} from "~icons";
import { TSideMenuNodeIds } from "~types";

export type TSideMenuProps = {
  collapsed: boolean;
  expandedNodeIds: TSideMenuNodeIds;
  handleToggle: (_: any, nodeIds: TSideMenuNodeIds) => void;
  selectedNodeIds: TSideMenuNodeIds;
};

const useStyles = makeStyles({
  root: {
    "& .MuiTreeItem-root": {
      padding: "3px 0",
      background: "none",
      transition: "all 200ms ease-in-out"
    },
    "& .MuiTreeItem-root:hover": {
      background: "none",
      "& .MuiTreeItem-label": {
        color: "#fff"
      }
    },
    "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label": {
      background: "none"
    },
    "& .MuiTreeItem-content": {
      padding: "3px 0 0 20px"
    },
    "& .MuiTreeItem-content:hover": {
      background: "#004f5a"
    },
    "& .Mui-selected > .MuiTreeItem-content": {
      background: "#004f5a"
    },
    "& .MuiTreeItem-root:focus > .MuiTreeItem-content .MuiTreeItem-label": {
      background: "none"
    }
  }
});

const SideMenu = ({
  collapsed,
  expandedNodeIds,
  handleToggle,
  selectedNodeIds
}: TSideMenuProps): JSX.Element => (
  <Tree data-testid="sidemenu-tree" collapsed={collapsed}>
    <TreeView
      className={useStyles().root}
      defaultCollapseIcon={<MdExpandMore />}
      defaultExpandIcon={<MdChevronRight />}
      expanded={expandedNodeIds}
      selected={selectedNodeIds}
      onNodeToggle={handleToggle}
    >
      <TreeItem
        icon={<MdDashboard />}
        nodeId="dashboard"
        label={
          <NavLink
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
