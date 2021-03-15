import { collapseSideNav, toggleSideNav } from "~actions/Sidemenu";
import MenuButton from "~components/Layout/MenuButton";
import { IconContext, RiMenuFoldLine, RiMenuUnfoldLine } from "~icons";

export type TMenuHamburgerProps = {
  collapsed: boolean;
  onClick: typeof toggleSideNav | typeof collapseSideNav;
  primary?: boolean;
};

const MenuHamburger = ({
  collapsed,
  onClick,
  primary
}: TMenuHamburgerProps): JSX.Element => (
  <MenuButton
    data-testid="hamburger-menu"
    primary={primary}
    hoverable
    type="button"
    onClick={onClick}
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
);

export default MenuHamburger;
