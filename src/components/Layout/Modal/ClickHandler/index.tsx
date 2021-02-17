import * as React from "react";
import { ReactNode } from "~types";

export interface IClickHandlerProps {
  closeModal: (() => void) | undefined;
  children: ReactNode;
}

class ClickHandler extends React.PureComponent<IClickHandlerProps> {
  componentDidMount(): void {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount(): void {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  wrapperRef = React.createRef<HTMLDivElement>();

  handleClickOutside = (event: Event): void => {
    const { closeModal } = this.props;

    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target as Node) &&
      closeModal
    )
      closeModal();
  };

  render = (): JSX.Element => (
    <div ref={this.wrapperRef}>{this.props.children}</div>
  );
}

export default ClickHandler;
