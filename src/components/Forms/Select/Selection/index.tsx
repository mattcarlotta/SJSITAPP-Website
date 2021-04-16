import * as React from "react";
import Icon from "~components/Layout/Icon";
import ChevronIcon from "../ChevronIcon";
import DisplayOption from "../DisplayOption";
import Input from "../Input";
import SelectionContainer from "../SelectionContainer";
import SelectText from "../SelectText";
import { ChangeEvent, CSSProperties, EventTarget } from "~types";

const searchStyle = {
  position: "relative",
  right: 0,
  display: "flex",
  boxSizing: "border-box",
  padding: "10px"
} as CSSProperties;

export type TSelectionProps = {
  disabled?: boolean;
  handleInputChange: (e: ChangeEvent<any>) => void;
  handleSearchClear: (props: EventTarget) => void;
  handleSelectClick: () => void;
  hideIcon?: boolean;
  height?: string;
  icon?: string;
  isVisible: boolean;
  isSearchable?: boolean;
  justifyContent?: string;
  padding?: string;
  placeholder?: string;
  name: string;
  searchText?: string;
  value?: string;
};

const Selection = ({
  disabled,
  handleInputChange,
  handleSearchClear,
  handleSelectClick,
  hideIcon,
  height,
  icon,
  isVisible,
  isSearchable,
  justifyContent,
  padding,
  placeholder,
  name,
  searchText,
  value
}: TSelectionProps): JSX.Element => (
  <SelectionContainer tabIndex={0} data-testid={name} height={height}>
    <SelectText
      dataTestId="select-text"
      handleSelectClick={!disabled ? handleSelectClick : undefined}
    >
      {icon && <Icon dataTestId="select-icon" type={icon} />}
      <DisplayOption
        data-testid={`${name}-selected-value`}
        padding={padding}
        justifyContent={justifyContent}
        icon={icon}
        value={value}
      >
        {isSearchable && !value ? (
          <Input
            type="text"
            aria-label="text search box"
            placeholder={placeholder}
            onChange={handleInputChange}
            value={searchText}
          />
        ) : (
          <>{!value ? placeholder : value}</>
        )}
      </DisplayOption>
      {hideIcon ? null : !isSearchable ? (
        <ChevronIcon isVisible={isVisible} />
      ) : !value && !searchText ? (
        <Icon dataTestId="search-icon" style={searchStyle} type="search" />
      ) : (
        <Icon
          dataTestId="clear-selection"
          color="rgba(255, 0, 0, 0.65) !important"
          onHoverColor="rgba(204, 0, 0, 0.65) !important"
          onClick={() => handleSearchClear({ target: { name, value: "" } })}
          style={searchStyle}
          type="erase"
        />
      )}
    </SelectText>
  </SelectionContainer>
);

export default Selection;
