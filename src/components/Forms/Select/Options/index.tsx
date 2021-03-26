import * as React from "react";
import Fuse from "fuse.js";
import isEmpty from "lodash.isempty";
import { FaSearchLocation } from "~icons";
import DropContainer from "./DropContainer";
import Option from "./Option";
import OptionsContainer from "./OptionsContainer";
import NoOptions from "./NoOptions";
import { EventTarget, EventTargetDataset, KeyboardEvent } from "~types";

export interface SelectOptionsContainerProps {
  handleOptionSelect: (props: EventTarget) => void;
  isVisible: boolean;
  name: string;
  padding?: string;
  searchText?: string;
  selected: string;
  selectOptions: Array<string>;
  textAlign?: string;
}

export interface SelectOptionsContainerState {
  searchOptions: Fuse<string>;
}

class SelectOptionsContainer extends React.Component<
  SelectOptionsContainerProps,
  SelectOptionsContainerState
> {
  state = {
    searchOptions: new Fuse(this.props.selectOptions)
  };

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
    const { searchOptions } = this.state;
    const {
      name,
      padding,
      searchText,
      selected,
      selectOptions,
      textAlign
    } = this.props;

    const options = !searchText
      ? selectOptions
      : searchOptions.search(searchText).map(({ item }) => item);

    return this.props.isVisible ? (
      <DropContainer>
        <OptionsContainer>
          {!isEmpty(options) ? (
            options.map(value => (
              <Option
                key={value}
                name={name}
                padding={padding}
                textAlign={textAlign}
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
              <span>No results were found.</span>
            </NoOptions>
          )}
        </OptionsContainer>
      </DropContainer>
    ) : null;
  };
}

export default SelectOptionsContainer;
