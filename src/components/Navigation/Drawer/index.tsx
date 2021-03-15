import { makeStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import { toggleSideNav } from "~actions/Sidemenu";
import FlexStart from "~components/Layout/FlexStart";
import MenuHamburger from "~components/Layout/MenuHamburger";
import TeamLogo from "~components/Layout/TeamLogo";
import { ReactNode } from "~types";
import Divider from "~components/Layout/Divider";
import Margin from "~components/Layout/Margin";

export type TDrawerProps = {
  children: ReactNode;
  open: boolean;
  onClose: typeof toggleSideNav;
};

const useStyles = makeStyles({
  paper: {
    width: 300,
    background: "#0d6472"
  }
});

const SideDrawer = ({ children, onClose, open }: TDrawerProps): JSX.Element => (
  <Drawer
    data-testid="drawer-sidemenu"
    anchor="left"
    classes={useStyles()}
    open={open}
    onClose={onClose}
  >
    <FlexStart padding="8px 4px" style={{ color: "#fff" }}>
      <Margin right="22px">
        <MenuHamburger primary collapsed={false} onClick={onClose} />
      </Margin>
      <TeamLogo />
    </FlexStart>
    <Divider />
    {children}
  </Drawer>
);

export default SideDrawer;
