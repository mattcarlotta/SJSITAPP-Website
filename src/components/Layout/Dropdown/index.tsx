import ClickHandler from "./ClickHandler";
import DropdownContainer from "./DropdownContainer";
import DropdownMenu from "./DropdownMenu";
import SelectContainer from "./SelectContainer";
import { ReactElement, ReactNode } from "~types";

export type TDropdownProps = {
  children: ReactNode;
  menu: ReactNode;
};

const Dropdown = ({ children, menu }: TDropdownProps): ReactElement => (
  <ClickHandler>
    {({ isVisible, handleMenuClick }) => (
      <SelectContainer data-testid="select-container">
        <DropdownContainer
          data-testid="dropdown-container"
          onClick={handleMenuClick}
        >
          {children}
        </DropdownContainer>
        {isVisible && (
          <DropdownMenu data-testid="dropdown-menu">{menu}</DropdownMenu>
        )}
      </SelectContainer>
    )}
  </ClickHandler>
);

export default Dropdown;
