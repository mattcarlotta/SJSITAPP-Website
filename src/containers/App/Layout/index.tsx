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
import {
  ChangeEvent,
  ConnectedProps,
  ReactElement,
  TSideMenuNodeIds,
  PickReduxState
} from "~types";

/* istanbul ignore next */
const mapState = ({ auth, sidemenu }: PickReduxState<"auth" | "sidemenu">) => ({
  role: auth.role,
  ...sidemenu
});

/* istanbul ignore next */
const mapDispatch = {
  ...actions
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type TAppLayoutProps = PropsFromRedux & {
  children?: ReactElement<any>;
  collapsed: boolean;
  expandedNodeIds: TSideMenuNodeIds;
  role: string;
  selectedNodeIds: TSideMenuNodeIds;
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

  const handleToggle = (_: ChangeEvent<any>, nodeIds: TSideMenuNodeIds) => {
    setExpandedTabs(nodeIds);
  };

  React.useLayoutEffect(() => {
    setExpandedTabs(expandedIds(pathname));
    setSelectedTabs(selectedTab(pathname));
  }, []);

  return (
    <AppContainer data-testid="app-layout" direction="column">
      <TopBar
        role={rest.role}
        collapsed={collapsed}
        toggleSideNav={toggleSideNav}
      />
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

export default connector(AppLayout);
