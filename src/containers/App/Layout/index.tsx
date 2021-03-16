import * as React from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "~actions/Sidemenu";
import AppContainer from "~components/Layout/AppContainer";
import Main from "~components/Layout/Main";
import NavBar from "~components/Navigation/NavBar";
import SideMenu from "~components/Navigation/SideMenu";
import TopBar from "~components/Navigation/TopBar";
import { expandedIds, selectedTab } from "./Tabs";
import { ReactElement, TSideMenuNodeIds, TRootState } from "~types";

export type TAppLayoutProps = {
  children?: ReactElement<any>;
  collapsed: boolean;
  collapseSideNav: typeof actions.collapseSideNav;
  expandedNodeIds: TSideMenuNodeIds;
  role: string;
  selectedNodeIds: TSideMenuNodeIds;
  toggleSideNav: typeof actions.toggleSideNav;
  setSelectedTabs: typeof actions.setSelectedTabs;
  setExpandedTabs: typeof actions.setExpandedTabs;
};

export const AppLayout = ({
  children,
  collapsed,
  collapseSideNav,
  setExpandedTabs,
  setSelectedTabs,
  toggleSideNav,
  ...rest
}: TAppLayoutProps): JSX.Element => {
  const { pathname } = useRouter();

  const handleToggle = React.useCallback((_, nodeIds: TSideMenuNodeIds) => {
    setExpandedTabs(nodeIds);
  }, []);

  React.useEffect(() => {
    setExpandedTabs(expandedIds(pathname));
    setSelectedTabs(selectedTab(pathname));
  }, []);

  return (
    <AppContainer data-testid="app-layout" direction="column">
      <TopBar collapsed={collapsed} toggleSideNav={toggleSideNav} />
      <NavBar
        collapsed={collapsed}
        collapseSideNav={collapseSideNav}
        pathname={pathname}
        toggleSideNav={toggleSideNav}
      >
        <SideMenu {...rest} handleToggle={handleToggle} />
      </NavBar>
      <Main stretch={collapsed}>{children}</Main>
    </AppContainer>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({
  auth,
  sidemenu
}: Pick<TRootState, "auth" | "sidemenu">) => ({
  role: auth.role,
  ...sidemenu
});

/* istanbul ignore next */
const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
