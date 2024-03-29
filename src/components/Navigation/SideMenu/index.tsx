import { makeStyles } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import Divider from "~components/Layout/Divider";
import FormatDate from "~components/Layout/FormatDate";
import Legal from "~components/Layout/Legal";
import Tree from "~components/Layout/Tree";
import NavLink from "~components/Navigation/NavLink";
import NavTitle from "~components/Navigation/NavTitle";
import { fullyearFormat } from "~utils/dateFormats";
import { MdExpandMore, MdChevronRight } from "~icons";
import { EmployeeRoutes, StaffRoutes } from "./Tabs";
import { ChangeEvent, ReactElement, TSideMenuNodeIds } from "~types";

export type TSideMenuProps = {
  expandedNodeIds: TSideMenuNodeIds;
  handleToggle: (_: ChangeEvent<any>, nodeIds: TSideMenuNodeIds) => void;
  role: string;
  selectedNodeIds: TSideMenuNodeIds;
};

const useStyles = makeStyles({
  root: {
    background: "#0d6472",
    "& .MuiTreeItem-root": {
      padding: "3px 0",
      background: "none"
    },
    "& .MuiTreeItem-root:hover": {
      background: "none"
    },
    "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label":
      {
        background: "none"
      },
    "& .MuiTreeItem-content": {
      padding: "3px 0 3px 20px"
    },
    "& .MuiTreeItem-iconContainer": {
      width: 20
    },
    "& .MuiTreeItem-label:hover": {
      background: "none"
    },
    "& .MuiTreeItem-content:hover": {
      background: "#00778a"
    },
    "& .Mui-selected > .MuiTreeItem-content": {
      background: "#00778a",
      // background: "#004f5a",
      // background: "#ef7f00",
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
  expandedNodeIds,
  role,
  handleToggle,
  selectedNodeIds
}: TSideMenuProps): ReactElement => {
  const TABS = role !== "member" ? StaffRoutes : EmployeeRoutes;

  return (
    <Tree data-testid="sidemenu-tree">
      <TreeView
        className={useStyles().root}
        defaultCollapseIcon={<MdExpandMore style={{ fontSize: 20 }} />}
        defaultExpandIcon={<MdChevronRight style={{ fontSize: 20 }} />}
        expanded={expandedNodeIds}
        selected={selectedNodeIds}
        onNodeToggle={handleToggle}
      >
        {TABS.map(({ divider, icon, nodeId, href, title, testId, submenu }) =>
          divider ? (
            <Divider key={title} margin="5px 10px 5px 10px" />
          ) : (
            <TreeItem
              key={nodeId}
              icon={icon}
              nodeId={nodeId as string}
              label={
                href ? (
                  <NavLink
                    nounderline
                    select="none"
                    padding="2px 0px"
                    marginRight="0px"
                    width="100%"
                    dataTestId={testId as string}
                    href={`/employee/${href}`}
                  >
                    {title}
                  </NavLink>
                ) : (
                  <NavTitle data-testid={title} select="none">
                    {title}
                  </NavTitle>
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
                            select="none"
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
      <Legal>
        © 2019&nbsp;-&nbsp;
        <FormatDate
          format={fullyearFormat}
          style={{ display: "inline", marginRight: 5 }}
        />
        Matt Carlotta
      </Legal>
    </Tree>
  );
};

export default SideMenu;
