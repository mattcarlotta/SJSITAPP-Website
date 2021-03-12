import React from "react";
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
  errors?: string;
  handleInputChange: (e: ChangeEvent<any>) => void;
  handleSearchClear: (props: EventTarget) => void;
  handleSelectClick: () => void;
  icon?: string;
  isVisible: boolean;
  isSearchable?: boolean;
  name: string;
  searchText?: string;
  value?: string;
  placeholder?: string;
};

const Selection = ({
  disabled,
  errors,
  handleInputChange,
  handleSearchClear,
  handleSelectClick,
  icon,
  isVisible,
  isSearchable,
  placeholder,
  name,
  searchText,
  value
}: TSelectionProps): JSX.Element => (
  <SelectionContainer
    tabIndex={0}
    data-testid={name}
    disabled={disabled}
    errors={errors}
    isVisible={isVisible}
    value={value}
  >
    <SelectText
      dataTestId="select-text"
      handleSelectClick={!disabled ? handleSelectClick : undefined}
    >
      {icon && <Icon dataTestId="select-icon" type={icon} />}
      <DisplayOption icon={icon} value={value}>
        {isSearchable && !value ? (
          <Input
            type="text"
            aria-label="text search box"
            placeholder={placeholder}
            onChange={handleInputChange}
            value={searchText}
          />
        ) : (
          <span className="selectValue">{!value ? placeholder : value}</span>
        )}
      </DisplayOption>
      {!isSearchable ? (
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
