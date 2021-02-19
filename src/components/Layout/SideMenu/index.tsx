import * as React from "react";
import styled from "@emotion/styled";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { MdExpandMore, MdChevronRight } from "react-icons/md";
import { FC } from "~types";

export type SideMenuComponentProps = {
  className?: string;
};

const SideMenuComponent: FC<SideMenuComponentProps> = ({ className }) => {
  return (
    <aside className={className}>
      <TreeView
        defaultCollapseIcon={<MdExpandMore />}
        defaultExpandIcon={<MdChevronRight />}
        multiSelect
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
          <TreeItem nodeId="3" label="Chrome" />
          <TreeItem nodeId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="6" label="Material-UI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView>
    </aside>
  );
};

const SideMenu = styled(SideMenuComponent)`
  @media (max-width: 1200px) {
    display: none;
  }

  overflow: auto;
  padding: 5px;
  flex: 0 0 266px;
  max-width: 266px;
  min-width: 266px;
  width: 266px;
  background: #fff;
  box-shadow: 2px 4px 0 3px rgba(35, 207, 234, 0.3);
  transition: all 0.2s;
  min-height: 100vh;
  position: fixed;
  top: 60px;
  z-index: 3;
`;

export default SideMenu;
