import * as React from "react";
import { css } from "@emotion/react";
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
import { ReactElement, TSideMenuNodeIds, TRootState } from "~types";

export type TAppLayoutProps = {
  children?: ReactElement<any>;
  collapsed: boolean;
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
        <FlexCenter height="100%">
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
              SHARKS ICE
              <img
                css={css`
                  margin: 0 3px 0 5px;
                `}
                src="/logo_24x24.png"
                alt="logo"
              />
              TEAM
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
        role={role}
        selectedNodeIds={selectedNodeIds}
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
