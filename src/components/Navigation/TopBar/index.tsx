import Flex from "~components/Layout/Flex";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexMiddle from "~components/Layout/FlexMiddle";
import FlexStart from "~components/Layout/FlexStart";
import Header from "~components/Layout/Header";
import MenuHamburger from "~components/Layout/MenuHamburger";
import TeamLogo from "~components/Layout/TeamLogo";
import MenuLink from "~components/Navigation/MenuLink";
import SearchBar from "~components/Navigation/SearchBar";
import UserAvatar from "~containers/App/UserAvatar";
import type { TToggleSideNav } from "~actions/Sidemenu";
import { ReactElement } from "~types";

export type TTopBarProps = {
  collapsed: boolean;
  toggleSideNav: TToggleSideNav;
  role: string;
};

export const TopBar = ({
  collapsed,
  role,
  toggleSideNav
}: TTopBarProps): ReactElement => (
  <Header>
    <Flex height="100%">
      <FlexStart breakpoint width="33.33%">
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
      <FlexMiddle width="33.33%">
        <SearchBar role={role} />
      </FlexMiddle>
      <FlexEnd breakpoint width="33.33%">
        <UserAvatar />
      </FlexEnd>
    </Flex>
  </Header>
);

export default TopBar;
