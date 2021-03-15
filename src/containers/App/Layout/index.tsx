import * as React from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "~actions/Sidemenu";
import Flex from "~components/Layout/Flex";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import Header from "~components/Layout/Header";
import Main from "~components/Layout/Main";
import MenuHamburger from "~components/Layout/MenuHamburger";
import Section from "~components/Layout/Section";
import TeamLogo from "~components/Layout/TeamLogo";
import MenuLink from "~components/Navigation/MenuLink";
import NavBar from "~components/Navigation/NavBar";
import UserAvatar from "~containers/App/UserAvatar";
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
  expandedNodeIds,
  role,
  selectedNodeIds,
  setExpandedTabs,
  setSelectedTabs,
  toggleSideNav
}: TAppLayoutProps): JSX.Element => {
  const router = useRouter();

  const handleToggle = React.useCallback((_, nodeIds: TSideMenuNodeIds) => {
    setExpandedTabs(nodeIds);
  }, []);

  React.useEffect(() => {
    setExpandedTabs(expandedIds(router.pathname));
    setSelectedTabs(selectedTab(router.pathname));
  }, []);

  return (
    <Section data-testid="app-layout" direction="column">
      <Header>
        <Flex height="100%">
          <FlexStart>
            <MenuHamburger collapsed={collapsed} onClick={toggleSideNav} />
            <MenuLink
              dataTestId="logo-dashboard-link"
              href="/"
              hoverable
              fontSize="17px"
              padding="6px 12px"
              width="auto"
            >
              <TeamLogo />
            </MenuLink>
          </FlexStart>
          <FlexEnd>
            <UserAvatar />
          </FlexEnd>
        </Flex>
      </Header>
      <NavBar
        collapsed={collapsed}
        collapseSideNav={collapseSideNav}
        expandedNodeIds={expandedNodeIds}
        handleToggle={handleToggle}
        role={role}
        router={router}
        selectedNodeIds={selectedNodeIds}
        toggleSideNav={toggleSideNav}
      />
      <Main stretch={collapsed}>{children}</Main>
    </Section>
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
