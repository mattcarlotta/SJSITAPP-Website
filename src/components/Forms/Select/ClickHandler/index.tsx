/* eslint-disable no-lonely-if */
import * as React from "react";
import { ChangeEvent, EventTarget } from "~types";

export interface ISelectClickHandlerProps {
  disabled?: boolean;
  onChange: (props: EventTarget) => void;
  children: ({
    isVisible,
    handleInputChange,
    handleSearchClear,
    handleSelectClick,
    handleOptionSelect,
    searchText
  }: {
    isVisible: boolean;
    handleInputChange: (e: ChangeEvent<any>) => void;
    handleSearchClear: (props: EventTarget) => void;
    handleSelectClick: () => void;
    handleOptionSelect: (props: EventTarget) => void;
    searchText: string;
  }) => JSX.Element;
}

export interface ISelectClickHandlerState {
  isVisible: boolean;
  searchText?: string;
}

class ClickHandler extends React.Component<
  ISelectClickHandlerProps,
  ISelectClickHandlerState
> {
  state = {
    isVisible: false,
    searchText: ""
  };

  componentDidMount(): void {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("keydown", this.handleTabPress);
  }

  componentWillUnmount(): void {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleTabPress);
  }

  wrapperRef = React.createRef<HTMLDivElement>();

  handleTabPress = (event: KeyboardEvent): void => {
    if (event.key === "Tab") {
      if (
        !this.props.disabled &&
        !this.state.isVisible &&
        this.wrapperRef.current &&
        this.wrapperRef.current.contains(event.target as Node)
      ) {
        this.handleOpen();
      } else {
        if (
          !this.props.disabled &&
          this.state.isVisible &&
          this.wrapperRef.current &&
          !this.wrapperRef.current.contains(event.target as Node)
        ) {
          this.handleClose();
        }
      }
    }
  };

  handleClickOutside = (event: Event) => {
    if (
      !this.props.disabled &&
      this.state.isVisible &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target as Node)
    ) {
      this.handleClose();
    }
  };

  handleInputChange = (e: ChangeEvent<any>) => {
    this.setState({ searchText: e.target.value, isVisible: true });
  };

  handleSearchClear = (props: EventTarget) => {
    this.setState({ searchText: "" }, () => this.props.onChange({ ...props }));
  };

  handleClose = () => {
    this.setState({ isVisible: false });
  };

  handleOpen = () => {
    this.setState({ isVisible: true });
  };

  handleSelectClick = () => {
    this.setState(prevState => ({ isVisible: !prevState.isVisible }));
  };

  handleOptionSelect = (props: EventTarget) => {
    this.setState({ isVisible: false, searchText: "" }, () =>
      this.props.onChange({ ...props })
    );
  };

  render = () => (
    <div className="clickhandler" ref={this.wrapperRef}>
      {this.props.children({
        ...this.state,
        handleInputChange: this.handleInputChange,
        handleSearchClear: this.handleSearchClear,
        handleSelectClick: this.handleSelectClick,
        handleOptionSelect: this.handleOptionSelect
      })}
    </div>
  );
}

export default ClickHandler;
/* eslint-enable no-lonely-if */
