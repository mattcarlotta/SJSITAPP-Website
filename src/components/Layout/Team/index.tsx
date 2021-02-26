/* istanbul ignore file */
import * as React from "react";
// import { Tooltip } from "@material-ui/core";
import Tooltip from "~components/Layout/Tooltip";
import LoadingImage from "./LoadingImage";

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

  componentDidMount = (): void => {
    if (
      this.imageRef &&
      this.imageRef.current &&
      this.imageRef.current.complete
    )
      this.setState({ isLoaded: true });
  };

  componentWillUnmount = (): void => {
    this.cancelLoad = true;
  };

  cancelLoad = false;

  imageRef = React.createRef<HTMLImageElement>();

  handleLoaded = (): void => {
    if (!this.cancelLoad) this.setState({ isLoaded: true });
  };

  render = (): JSX.Element => {
    const { isLoaded } = this.state;
    const { folder, size, team } = this.props;

    return (
      <Tooltip title={team}>
        <span>
          <LoadingImage
            opacity={isLoaded ? 1 : this.props.opacity}
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

export default DisplayTeam;

/*
const DisplayTeam = ({
  folder,
  opacity,
  size,
  team
}: TDisplayTeamProps): JSX.Element => {
  const [isLoaded, setLoaded] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const imageLoaded = imageRef && imageRef.current && imageRef.current.complete;

  const handleLoaded = React.useCallback(() => {
    if (imageLoaded) setLoaded(true);
  }, [imageLoaded]);

  React.useEffect(() => {
    if (imageLoaded) handleLoaded();
  }, [handleLoaded, imageLoaded]);

  return (
    <Tooltip placement="top" title={team}>
      <span>
        <LoadingImage
          opacity={isLoaded ? 1 : opacity}
          size={size}
          duration={isLoaded ? "0s" : undefined}
          bgColor={isLoaded ? "transparent" : undefined}
        >
          <img
            ref={imageRef}
            src={`${process.env.NEXT_PUBLIC_IMAGEAPI}/images/${folder}/${team}.png`}
            alt={`${team}.png`}
            onLoad={handleLoaded}
            onError={handleLoaded}
          />
        </LoadingImage>
      </span>
    </Tooltip>
  );
};

export default DisplayTeam;
*/
