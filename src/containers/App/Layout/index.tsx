import * as React from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "~actions/Sidemenu";
import FlexCenter from "~components/Layout/FlexCenter";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import Header from "~components/Layout/Header";
import Main from "~components/Layout/Main";
import MenuButton from "~components/Layout/MenuButton";
import Section from "~components/Layout/Section";
import SideMenu from "~components/Navigation/SideMenu";
import MenuLink from "~components/Navigation/MenuLink";
import UserAvatar from "~containers/App/UserAvatar";
import { IconContext, RiMenuFoldLine, RiMenuUnfoldLine } from "~icons";
import { expandedIds, selectedTab } from "./Tabs";
import { ReactElement, FC, TSideMenuNodeIds, TRootState } from "~types";

interface AppLayoutProps {
  children?: ReactElement<any>;
  collapsed: boolean;
  expandedNodeIds: TSideMenuNodeIds;
  selectedNodeIds: TSideMenuNodeIds;
  toggleSideNav: typeof actions.toggleSideNav;
  setSelectedTabs: typeof actions.setSelectedTabs;
  setExpandedTabs: typeof actions.setExpandedTabs;
}

export const AppLayout: FC<AppLayoutProps> = ({
  children,
  collapsed,
  expandedNodeIds,
  selectedNodeIds,
  setExpandedTabs,
  setSelectedTabs,
  toggleSideNav
}) => {
  const router = useRouter();
  const handleToggle = React.useCallback((_, nodeIds: TSideMenuNodeIds) => {
    setExpandedTabs(nodeIds);
  }, []);

  const handleSelect = React.useCallback((_, nodeIds: TSideMenuNodeIds) => {
    setSelectedTabs(nodeIds);
  }, []);

  React.useEffect(() => {
    setExpandedTabs(expandedIds(router.pathname));
    setSelectedTabs(selectedTab(router.pathname));
  }, []);

  return (
    <Section direction="column">
      <Header>
        <FlexCenter>
          <FlexStart>
            <MenuButton
              data-testid="hamburger-menu"
              hoverable
              onClick={toggleSideNav}
              margin="0 10px 0 5px"
            >
              <IconContext.Provider
                value={{
                  style: {
                    fontSize: 18
                  }
                }}
              >
                {collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
              </IconContext.Provider>
            </MenuButton>
            <MenuLink
              dataTestId="logo-dashboard-link"
              href="/"
              hoverable
              fontSize="17px"
              padding="6px 12px"
              width="auto"
            >
              SHARKS ICE TEAM
            </MenuLink>
          </FlexStart>
          <FlexEnd>
            <UserAvatar />
          </FlexEnd>
        </FlexCenter>
      </Header>
      <SideMenu
        collapsed={collapsed}
        expandedNodeIds={expandedNodeIds}
        handleToggle={handleToggle}
        handleSelect={handleSelect}
        selectedNodeIds={selectedNodeIds}
      />
      <Section direction="row" hideOverflowX>
        <Main stretch={collapsed}>{children}</Main>
      </Section>
    </Section>
  );
};

/* istanbul ignore next */
const mapStateToProps = ({ sidemenu }: Pick<TRootState, "sidemenu">) => ({
  collapsed: sidemenu.collapsed,
  expandedNodeIds: sidemenu.expandedNodeIds,
  selectedNodeIds: sidemenu.selectedNodeIds
});

/* istanbul ignore next */
const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
