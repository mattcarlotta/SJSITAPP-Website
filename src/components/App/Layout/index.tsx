import * as React from "react";
import { IconContext } from "react-icons";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import FlexCenter from "~components/Layout/FlexCenter";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import Header from "~components/Layout/Header";
import Main from "~components/Layout/Main";
import MenuButton from "~components/Layout/MenuButton";
import Section from "~components/Layout/Section";
import SideMenu from "~components/Layout/SideMenu";
import MenuLink from "~components/Navigation/MenuLink";
import UserAvatar from "~containers/App/UserAvatar";
import { ReactElement, FC } from "~types";

interface AppLayoutProps {
  children?: ReactElement<any>;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const [collapseSideMenu, setCollapse] = React.useState(false);

  const handleCollapse = React.useCallback(() => {
    setCollapse(prevState => !prevState);
  }, []);

  return (
    <Section direction="column">
      <Header>
        <FlexCenter>
          <FlexStart>
            <MenuLink
              dataTestId="logo-dashboard-link"
              href="/"
              hoverable
              fontSize="20px"
              padding="6px 18px"
              width="auto"
            >
              SHARKS ICE TEAM
            </MenuLink>
            <MenuButton
              data-testid="hamburger-menu"
              hoverable
              onClick={handleCollapse}
            >
              <IconContext.Provider
                value={{
                  style: {
                    fontSize: 18
                  }
                }}
              >
                {collapseSideMenu ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
              </IconContext.Provider>
            </MenuButton>
          </FlexStart>
          <FlexEnd>
            <UserAvatar />
          </FlexEnd>
        </FlexCenter>
      </Header>
      <SideMenu width={collapseSideMenu ? "0px" : undefined}>Menu</SideMenu>
      <Section direction="row" hideOverflowX>
        <Main stretch={collapseSideMenu}>{children}</Main>
      </Section>
    </Section>
  );
};

export default AppLayout;
