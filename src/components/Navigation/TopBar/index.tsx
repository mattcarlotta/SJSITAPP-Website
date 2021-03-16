import { toggleSideNav } from "~actions/Sidemenu";
import Flex from "~components/Layout/Flex";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import Header from "~components/Layout/Header";
import MenuHamburger from "~components/Layout/MenuHamburger";
import TeamLogo from "~components/Layout/TeamLogo";
import MenuLink from "~components/Navigation/MenuLink";
import UserAvatar from "~containers/App/UserAvatar";

export type TTopBarProps = {
  collapsed: boolean;
  toggleSideNav: typeof toggleSideNav;
};

export const TopBar = ({
  collapsed,
  toggleSideNav
}: TTopBarProps): JSX.Element => (
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
      <FlexEnd width="auto">
        <UserAvatar />
      </FlexEnd>
    </Flex>
  </Header>
);

export default TopBar;
