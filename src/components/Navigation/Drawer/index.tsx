import { makeStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import { toggleSideNav } from "~actions/Sidemenu";
import FlexStart from "~components/Layout/FlexStart";
import Margin from "~components/Layout/Margin";
import MenuHamburger from "~components/Layout/MenuHamburger";
import TeamLogo from "~components/Layout/TeamLogo";
import { ReactNode } from "~types";

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
    <FlexStart
      padding="9px 0px"
      style={{ background: "#fff", color: "#025f6d", fontSize: 17 }}
    >
      <Margin right="20px">
        <MenuHamburger collapsed={false} onClick={onClose} />
      </Margin>
      <TeamLogo />
    </FlexStart>
    {children}
  </Drawer>
);

export default SideDrawer;
