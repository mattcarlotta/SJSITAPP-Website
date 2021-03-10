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
import { MdExpandMore, MdChevronRight } from "~icons";
import { EmployeeRoutes, StaffRoutes } from "./Tabs";
import { TSideMenuNodeIds } from "~types";

export type TSideMenuProps = {
  collapsed: boolean;
  expandedNodeIds: TSideMenuNodeIds;
  handleToggle: (_: any, nodeIds: TSideMenuNodeIds) => void;
  role: string;
  selectedNodeIds: TSideMenuNodeIds;
};

const useStyles = makeStyles({
  root: {
    "& .MuiTreeItem-root": {
      padding: "3px 0",
      background: "none",
      transition: "background 200ms ease-in-out"
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
    "& .Mui-selected:hover": {
      "& a": {
        color: "#fff"
      }
    },
    "& .Mui-selected > .MuiTreeItem-content": {
      background: "#004f5a",
      "& a": {
        fontWeight: "500"
      }
    },
    "& .MuiTreeItem-root:focus > .MuiTreeItem-content .MuiTreeItem-label": {
      background: "none"
    }
  }
});

const SideMenu = ({
  collapsed,
  expandedNodeIds,
  role,
  handleToggle,
  selectedNodeIds
}: TSideMenuProps): JSX.Element => {
  const TABS = role !== "employee" ? StaffRoutes : EmployeeRoutes;

  return (
    <Tree data-testid="sidemenu-tree" collapsed={collapsed}>
      <TreeView
        className={useStyles().root}
        defaultCollapseIcon={<MdExpandMore />}
        defaultExpandIcon={<MdChevronRight />}
        expanded={expandedNodeIds}
        selected={selectedNodeIds}
        onNodeToggle={handleToggle}
      >
        {TABS.map(({ divider, icon, nodeId, href, title, testId, submenu }) =>
          divider ? (
            <Divider key={title} margin="20px 0 20px -20px" />
          ) : (
            <TreeItem
              key={nodeId}
              icon={icon}
              nodeId={nodeId as string}
              label={
                href ? (
                  <NavLink
                    nounderline
                    padding="2px 0px"
                    marginRight="0px"
                    width="100%"
                    dataTestId={testId as string}
                    href={`/employee/${href}`}
                  >
                    {title}
                  </NavLink>
                ) : (
                  <NavTitle>{title}</NavTitle>
                )
              }
            >
              {submenu
                ? submenu.map(
                    ({ subicon, subnodeId, subhref, subtitle, subtestId }) => (
                      <TreeItem
                        key={subnodeId}
                        icon={subicon}
                        nodeId={subnodeId}
                        label={
                          <NavLink
                            nounderline
                            padding="2px 0px"
                            marginRight="0px"
                            width="100%"
                            dataTestId={subtestId}
                            href={`/employee/${subhref}`}
                          >
                            {subtitle}
                          </NavLink>
                        }
                      />
                    )
                  )
                : null}
            </TreeItem>
          )
        )}
      </TreeView>
      <Legal>© 2019-{moment().format("YYYY")} Matt Carlotta</Legal>
    </Tree>
  );
};

export default SideMenu;
