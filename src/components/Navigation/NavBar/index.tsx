import * as React from "react";
import * as actions from "~actions/Sidemenu";
import Drawer from "~components/Navigation/Drawer";
import FixedMenu from "~components/Layout/FixedMenu";
import useWindowSize from "~utils/useWindowSize";
import { NextRouter, ReactNode } from "~types";

export type TSideMenuProps = {
  children: ReactNode;
  collapsed: boolean;
  collapseSideNav: typeof actions.collapseSideNav;
  toggleSideNav: typeof actions.toggleSideNav;
  pathname: string;
};

const NavBar = ({
  children,
  collapsed,
  collapseSideNav,
  pathname,
  toggleSideNav
}: TSideMenuProps): JSX.Element => {
  const windowHeight = useWindowSize();
  const isMobile = windowHeight <= 1400;

  React.useLayoutEffect(() => {
    if (isMobile && !collapsed) collapseSideNav();
  }, [pathname, isMobile]);

  return !isMobile ? (
    <FixedMenu data-testid="fixed-sidemenu" collapsed={collapsed}>
      {children}
    </FixedMenu>
  ) : (
    <Drawer open={!collapsed} onClose={toggleSideNav}>
      {children}
    </Drawer>
  );
};

export default NavBar;
