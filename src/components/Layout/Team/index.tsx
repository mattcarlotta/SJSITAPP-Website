/* istanbul ignore file */
import * as React from "react";
import Tooltip from "~components/Layout/Tooltip";
import LoadingImage from "./LoadingImage";
import { ReactElement } from "~types";

export type TDisplayTeamProps = {
  folder: string;
  opacity?: number;
  size?: number;
  team: string;
};

export type TDisplayTeamState = {
  isLoaded: boolean;
};

class DisplayTeam extends React.Component<
  TDisplayTeamProps,
  TDisplayTeamState
> {
  state = { isLoaded: false };

  componentWillUnmount = (): void => {
    this.cancelLoad = true;
  };

  cancelLoad = false;

  imageRef = React.createRef<HTMLImageElement>();

  handleLoaded = (): void => {
    if (!this.cancelLoad) this.setState({ isLoaded: true });
  };

  render = (): ReactElement => {
    const { isLoaded } = this.state;
    const { folder, size, opacity, team } = this.props;

    return (
      <Tooltip title={team}>
        <span data-testid={team}>
          <LoadingImage
            opacity={isLoaded ? 1 : opacity}
            size={size}
            duration={isLoaded ? "0s" : undefined}
            bgColor={isLoaded ? "transparent" : undefined}
          >
            <img
              ref={this.imageRef}
              src={`${process.env.NEXT_PUBLIC_IMAGEAPI}/images/${folder}/${team}.png`}
              alt={`${team}.png`}
              onLoad={this.handleLoaded}
              onError={this.handleLoaded}
            />
          </LoadingImage>
        </span>
      </Tooltip>
    );
  };
}

export default React.memo(DisplayTeam);
