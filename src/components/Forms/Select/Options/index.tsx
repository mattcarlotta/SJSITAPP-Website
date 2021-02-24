import React, { PureComponent } from "react";
import isEmpty from "lodash.isempty";
import { FaSearchLocation } from "~icons";
import DropContainer from "./DropContainer";
import Option from "./Option";
import OptionsContainer from "./OptionsContainer";
import NoOptions from "./NoOptions";
import { EventTarget, EventTargetDataset, KeyboardEvent } from "~types";

export interface SelectOptionsContainerProps {
  handleOptionSelect: (props: EventTarget) => void;
  selected: string;
  isVisible: boolean;
  name: string;
  searchText?: string;
  selectOptions: Array<string>;
}

class SelectOptionsContainer extends PureComponent<SelectOptionsContainerProps> {
  componentDidUpdate = (prevProps: SelectOptionsContainerProps): void => {
    const { selected, isVisible } = this.props;

    if (selected !== prevProps.selected || isVisible) {
      this.handleScroll();
    }
  };

  handleScroll = (): void => {
    const { selected } = this.props;
    const element = document.getElementById(selected);

    /* istanbul ignore next */
    if (element)
      element.scrollIntoView({
        behavior: "auto",
        block: "nearest"
      });
  };

  handleKeySelect = (evt: KeyboardEvent<any>): void => {
    const { key } = evt;

    if (key === "Enter") {
      const {
        target: {
          dataset: { name, value }
        }
      } = evt as any;
      this.props.handleOptionSelect({ target: { name, value } });
    }
  };

  handleOptionSelect = ({
    target: {
      dataset: { name, value }
    }
  }: EventTargetDataset): void => {
    this.props.handleOptionSelect({ target: { name, value } });
  };

  render = (): JSX.Element | null => {
    const { name, searchText, selected, selectOptions } = this.props;

    const options = !searchText
      ? selectOptions
      : selectOptions.filter(value =>
          value.toLowerCase().includes(searchText.toLowerCase())
        );
    return this.props.isVisible ? (
      <DropContainer>
        <OptionsContainer>
          {!isEmpty(options) ? (
            options.map(value => (
              <Option
                key={value}
                name={name}
                value={value}
                onClick={this.handleOptionSelect}
                onKeyPress={this.handleKeySelect}
                selected={selected}
              />
            ))
          ) : (
            <NoOptions>
              <FaSearchLocation
                style={{ position: "relative", top: 4, marginRight: 5 }}
              />
              <span>Oops! No results were found.</span>
            </NoOptions>
          )}
        </OptionsContainer>
      </DropContainer>
    ) : null;
  };
}

// SelectOptionsContainer.propTypes = {
//   handleOptionSelect: PropTypes.func.isRequired,
//   isVisible: PropTypes.bool.isRequired,
//   name: PropTypes.string.isRequired,
//   searchText: PropTypes.string,
//   selected: PropTypes.string,
//   selectOptions: PropTypes.arrayOf(PropTypes.string.isRequired)
// };

export default SelectOptionsContainer;
