import * as React from "react";
import FlexCenter from "~components/Layout/FlexCenter";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import Header from "~components/Layout/Header";
import Main from "~components/Layout/Main";
import Section from "~components/Layout/Section";
import SideMenu from "~components/Layout/SideMenu";
import MenuLink from "~components/Navigation/MenuLink";
import UserAvatar from "~containers/App/UserAvatar";
import { ReactElement, FC } from "~types";

interface AppLayoutProps {
  children?: ReactElement<any>;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
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
          </FlexStart>
          <FlexEnd>
            <UserAvatar />
          </FlexEnd>
        </FlexCenter>
      </Header>
      <Section direction="row" hideOverflowX>
        <SideMenu>Menu</SideMenu>
        <Main>{children}</Main>
      </Section>
    </Section>
  );
};

export default AppLayout;
