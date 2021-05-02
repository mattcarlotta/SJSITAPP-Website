import MenuButton from "~components/Layout/MenuButton";
import { IconContext, RiMenuFoldLine, RiMenuUnfoldLine } from "~icons";
import type { TCollapseSideNav, TToggleSideNav } from "~actions/Sidemenu";
import { ReactElement } from "~types";

export type TMenuHamburgerProps = {
  collapsed: boolean;
  onClick: TToggleSideNav | TCollapseSideNav;
  primary?: boolean;
};

const MenuHamburger = ({
  collapsed,
  onClick,
  primary
}: TMenuHamburgerProps): ReactElement => (
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
