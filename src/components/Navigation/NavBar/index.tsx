import * as React from "react";
import Drawer from "~components/Navigation/Drawer";
import FixedMenu from "~components/Layout/FixedMenu";
import useWindowSize from "~utils/useWindowSize";
import { ReactElement, ReactNode } from "~types";
import type { TCollapseSideNav, TToggleSideNav } from "~actions/Sidemenu";

export type TSideMenuProps = {
  children: ReactNode;
  collapsed: boolean;
  collapseSideNav: TCollapseSideNav;
  toggleSideNav: TToggleSideNav;
  pathname: string;
};

const NavBar = ({
  children,
  collapsed,
  collapseSideNav,
  pathname,
  toggleSideNav
}: TSideMenuProps): ReactElement => {
  const windowHeight = useWindowSize();
  const isMobile = windowHeight <= 1400;

  React.useEffect(() => {
    if (isMobile && !collapsed) collapseSideNav();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [collapseSideNav, pathname, isMobile]);

  return !isMobile ? (
    <FixedMenu
      data-testid={`fixed-sidemenu-${collapsed ? "closed" : "open"}`}
      collapsed={collapsed}
    >
      {children}
    </FixedMenu>
  ) : (
    <Drawer open={!collapsed} onClose={toggleSideNav}>
      {children}
    </Drawer>
  );
};

export default NavBar;
