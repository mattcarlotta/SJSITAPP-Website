import * as React from "react";
import FlexCenter from "~components/Layout/FlexCenter";
import FlexEnd from "~components/Layout/FlexEnd";
import FlexStart from "~components/Layout/FlexStart";
import Header from "~components/Layout/Header";
import Main from "~components/Layout/Main";
import Section from "~components/Layout/Section";
import SideMenu from "~components/Layout/SideMenu";
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
          <FlexStart>Logo</FlexStart>
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
