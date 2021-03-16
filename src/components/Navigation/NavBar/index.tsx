import * as React from "react";
import * as actions from "~actions/Sidemenu";
import Drawer from "~components/Navigation/Drawer";
import FixedMenu from "~components/Layout/FixedMenu";
import SideMenu from "~components/Navigation/SideMenu";
import useWindowSize from "~utils/useWindowSize";
import { NextRouter, TSideMenuNodeIds } from "~types";

export type TSideMenuProps = {
  collapsed: boolean;
  collapseSideNav: typeof actions.collapseSideNav;
  expandedNodeIds: TSideMenuNodeIds;
  handleToggle: (_: any, nodeIds: TSideMenuNodeIds) => void;
  role: string;
  selectedNodeIds: TSideMenuNodeIds;
  toggleSideNav: typeof actions.toggleSideNav;
  router: NextRouter;
};

const NavBar = ({
  collapsed,
  collapseSideNav,
  router,
  toggleSideNav,
  ...rest
}: TSideMenuProps): JSX.Element => {
  const windowHeight = useWindowSize();
  const isMobile = windowHeight <= 1400;

  React.useLayoutEffect(() => {
    if (isMobile && !collapsed) collapseSideNav();
  }, [router.pathname, isMobile]);

  return !isMobile ? (
    <FixedMenu data-testid="fixed-sidemenu" collapsed={collapsed}>
      <SideMenu {...rest} />
    </FixedMenu>
  ) : (
    <Drawer open={!collapsed} onClose={toggleSideNav}>
      <SideMenu {...rest} />
    </Drawer>
  );
};

export default NavBar;
