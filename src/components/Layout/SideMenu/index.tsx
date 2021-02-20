import * as React from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import {
  MdDashboard,
  MdExpandMore,
  MdChevronRight,
  MdEvent,
  MdEventNote,
  MdNoteAdd
} from "react-icons/md";
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
  FaUsers
} from "react-icons/fa";
import { setSelectedTabs, setExpandedTabs } from "~actions/Sidemenu";
import Divider from "~components/Layout/Divider";
import Legal from "~components/Layout/Legal";
import Tree from "~components/Layout/Tree";
import { expandedIds, selectedTab } from "./Tabs";
import { FC, TRootState, TSideMenuNodeIds } from "~types";

export type TSideMenuProps = {
  collapse: boolean;
  expandedNodeIds: TSideMenuNodeIds;
  selectedNodeIds: TSideMenuNodeIds;
  setSelectedTabs: typeof setSelectedTabs;
  setExpandedTabs: typeof setExpandedTabs;
};

const SideMenu: FC<TSideMenuProps> = ({
  collapse,
  expandedNodeIds,
  selectedNodeIds,
  setSelectedTabs,
  setExpandedTabs
}) => {
  const router = useRouter();
  const handleToggle = React.useCallback((_, nodeIds: TSideMenuNodeIds) => {
    setExpandedTabs(nodeIds);
  }, []);

  const handleSelect = React.useCallback((_, nodeIds: TSideMenuNodeIds) => {
    setSelectedTabs(nodeIds);
  }, []);

  const handlePushToRoute = React.useCallback(
    (route: string) => {
      router.push(`/employee/${route}`);
    },
    [router]
  );

  React.useEffect(() => {
    setExpandedTabs(expandedIds(router.pathname));
    setSelectedTabs(selectedTab(router.pathname));
  }, []);

  return (
    <Tree collapse={collapse}>
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
          onLabelClick={() => handlePushToRoute("dashboard")}
          nodeId="dashboard"
          label="Dashboard"
        />
        <TreeItem icon={<MdEvent />} nodeId="events" label="Events">
          <TreeItem
            icon={<FaCalendarPlus />}
            onLabelClick={() => handlePushToRoute("events/create")}
            nodeId="events/create"
            label="Create Event"
          />
          <TreeItem
            icon={<MdEventNote />}
            onLabelClick={() => handlePushToRoute("events/viewall?page=1")}
            nodeId="events/viewall"
            label="View Events"
          />
        </TreeItem>
        <TreeItem icon={<FaFileSignature />} nodeId="forms" label="Forms">
          <TreeItem
            icon={<MdNoteAdd />}
            onLabelClick={() => handlePushToRoute("forms/create")}
            nodeId="forms/create"
            label="Create Forms"
          />
          <TreeItem
            icon={<FaFileAlt />}
            onLabelClick={() => handlePushToRoute("forms/viewall?page=1")}
            nodeId="forms/viewall"
            label="View Forms"
          />
        </TreeItem>
        <TreeItem icon={<FaEnvelope />} nodeId="mail" label="Mail">
          <TreeItem
            icon={<FaPaperPlane />}
            onLabelClick={() => handlePushToRoute("mail/create")}
            nodeId="mail/create"
            label="Send Mail"
          />
          <TreeItem
            icon={<FaMailBulk />}
            onLabelClick={() => handlePushToRoute("mail/viewall?page=1")}
            nodeId="mail/viewall"
            label="View Mail"
          />
        </TreeItem>
        <TreeItem icon={<FaUserFriends />} nodeId="members" label="Members">
          <TreeItem
            icon={<FaUserPlus />}
            onLabelClick={() => handlePushToRoute("members/create")}
            nodeId="members/create"
            label="Create Member"
          />
          <TreeItem
            icon={<FaKey />}
            onLabelClick={() =>
              handlePushToRoute("members/authorizations/viewall?page=1")
            }
            nodeId="members/authorizations/viewall"
            label="View Authorizations"
          />
          <TreeItem
            icon={<FaUsers />}
            onLabelClick={() => handlePushToRoute("members/viewall?page=1")}
            nodeId="members/viewall"
            label="View Members"
          />
        </TreeItem>
        <TreeItem
          icon={<FaCalendar />}
          onLabelClick={() => handlePushToRoute("schedule")}
          nodeId="schedule"
          label="Schedule"
        />
        <TreeItem icon={<FaFolder />} nodeId="seasons" label="Seasons">
          <TreeItem
            icon={<FaFolderPlus />}
            onLabelClick={() => handlePushToRoute("seasons/create")}
            nodeId="seasons/create"
            label="Create Season"
          />
          <TreeItem
            icon={<FaFolderOpen />}
            onLabelClick={() => handlePushToRoute("seasons/viewall?page=1")}
            nodeId="seasons/viewall"
            label="View Seasons"
          />
        </TreeItem>
        <Divider margin="20px 0 20px -20px" />
        <TreeItem
          nodeId="settings"
          label="Settings"
          icon={<FaCogs />}
          onLabelClick={() => handlePushToRoute("settings")}
        />
        <TreeItem
          icon={<FaQuestionCircle />}
          onLabelClick={() => handlePushToRoute("help")}
          nodeId="help"
          label="Help"
        />
        <TreeItem
          icon={<FaConciergeBell />}
          onLabelClick={() => handlePushToRoute("contact-us")}
          nodeId="contact-us"
          label="Contact Us"
        />
        <TreeItem
          icon={<FaBalanceScale />}
          onLabelClick={() => handlePushToRoute("privacy")}
          nodeId="privacy"
          label="Privacy Policy"
        />
        <TreeItem
          icon={<FaCopyright />}
          onLabelClick={() => handlePushToRoute("licensing")}
          nodeId="licensing"
          label="Licensing"
        />
      </TreeView>
      <Legal>© 2019-{moment().format("YYYY")} Matt Carlotta</Legal>
    </Tree>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({ sidemenu }: Pick<TRootState, "sidemenu">) => ({
  expandedNodeIds: sidemenu.expandedNodeIds,
  selectedNodeIds: sidemenu.selectedNodeIds
});

/* istanbul ignore next */
const mapDispatchToProps = {
  setSelectedTabs,
  setExpandedTabs
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
