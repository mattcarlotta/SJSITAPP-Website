/* eslint-disable no-lonely-if */
import * as React from "react";
import { ChangeEvent } from "~types";

export interface IInputClickHandlerProps {
  children: ({
    isFocused,
    handleBlur,
    handleFocus
  }: {
    isFocused: boolean;
    handleBlur: (e: ChangeEvent<any>) => void;
    handleFocus: (e: ChangeEvent<any>) => void;
  }) => JSX.Element;
  //   children: any;
}

export interface IInputClickHandlerState {
  isFocused: boolean;
}

class ClickHandler extends React.Component<
  IInputClickHandlerProps,
  IInputClickHandlerState
> {
  state = {
    isFocused: false
  };

  componentDidMount(): void {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount(): void {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  wrapperRef = React.createRef<HTMLSpanElement>();

  handleBlur = (): void => {
    this.setState({ isFocused: false });
  };

  handleFocus = (): void => {
    this.setState({ isFocused: true });
  };

  handleClickOutside = (event: Event): void => {
    if (
      this.state.isFocused &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target as Node)
    ) {
      this.handleBlur();
    }
  };

  render = (): JSX.Element => (
    <span ref={this.wrapperRef}>
      {this.props.children({
        isFocused: this.state.isFocused,
        handleBlur: this.handleBlur,
        handleFocus: this.handleFocus
      })}
    </span>
  );
}

export default ClickHandler;
/* eslint-enable no-lonely-if */
