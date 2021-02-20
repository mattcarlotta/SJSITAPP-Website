import * as React from "react";
import styled from "@emotion/styled";
import moment from "moment";
import Router from "next/router";
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
import Divider from "~components/Layout/Divider";
import Legal from "~components/Layout/Legal";
import { FC } from "~types";

export type SideMenuComponentProps = {
  className?: string;
};

const SideMenuComponent: FC<SideMenuComponentProps> = ({ className }) => {
  const handlePushToRoute = React.useCallback((route: string) => {
    Router.push(`/employee/${route}`);
  }, []);

  return (
    <aside className={className}>
      <TreeView
        defaultCollapseIcon={<MdExpandMore />}
        defaultExpandIcon={<MdChevronRight />}
      >
        <TreeItem icon={<MdDashboard />} nodeId="1" label="Dashboard" />
        <TreeItem icon={<MdEvent />} nodeId="2" label="Events">
          <TreeItem icon={<FaCalendarPlus />} nodeId="3" label="Create Event" />
          <TreeItem icon={<MdEventNote />} nodeId="4" label="View Events" />
        </TreeItem>
        <TreeItem icon={<FaFileSignature />} nodeId="5" label="Forms">
          <TreeItem icon={<MdNoteAdd />} nodeId="6" label="Create Forms" />
          <TreeItem icon={<FaFileAlt />} nodeId="7" label="View Forms" />
        </TreeItem>
        <TreeItem icon={<FaEnvelope />} nodeId="8" label="Mail">
          <TreeItem icon={<FaPaperPlane />} nodeId="9" label="Send Mail" />
          <TreeItem icon={<FaMailBulk />} nodeId="10" label="View Mail" />
        </TreeItem>
        <TreeItem icon={<FaUserFriends />} nodeId="11" label="Members">
          <TreeItem icon={<FaUserPlus />} nodeId="12" label="Create Member" />
          <TreeItem icon={<FaKey />} nodeId="13" label="View Authorizations" />
          <TreeItem icon={<FaUsers />} nodeId="14" label="View Members" />
        </TreeItem>
        <TreeItem icon={<FaCalendar />} nodeId="15" label="Schedule" />
        <TreeItem icon={<FaFolder />} nodeId="16" label="Seasons">
          <TreeItem icon={<FaFolderPlus />} nodeId="17" label="Create Season" />
          <TreeItem icon={<FaFolderOpen />} nodeId="18" label="View Seasons" />
        </TreeItem>
        <Divider margin="20px 0 20px -20px" />
        <TreeItem
          nodeId="19"
          label="Settings"
          icon={<FaCogs />}
          onLabelClick={() => handlePushToRoute("settings")}
        />
        <TreeItem icon={<FaQuestionCircle />} nodeId="20" label="Help" />
        <TreeItem icon={<FaConciergeBell />} nodeId="21" label="Contact Us" />
        <TreeItem
          icon={<FaBalanceScale />}
          nodeId="22"
          label="Privacy Policy"
        />
        <TreeItem icon={<FaCopyright />} nodeId="23" label="Licensing" />
      </TreeView>
      <Legal>© 2019-{moment().format("YYYY")} Matt Carlotta</Legal>
    </aside>
  );
};

const SideMenu = styled(SideMenuComponent)<{ width?: string }>`
  @media (max-width: 1200px) {
    display: none;
  }

  overflow: ${({ width }) => (width ? "hidden" : "auto")};
  padding: ${({ width }) => width || "5px 0 5px 20px"};
  width: ${({ width }) => width || "266px"};
  white-space: nowrap;
  background: #fff;
  box-shadow: ${({ width }) =>
    width ? "none" : "2px 2px 0px 2px rgba(35, 207, 234, 0.15)"};
  transition: all 0.2s;
  min-height: 100vh;
  position: fixed;
  top: 60px;
  z-index: 3;
  transition: 350ms;
`;

export default SideMenu;
