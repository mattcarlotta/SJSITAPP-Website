import styled from "@emotion/styled";
import FadeIn from "~components/Layout/FadeIn";
import { CSSProperties } from "~types";

export type TLoadingPanelProps = {
  className?: string;
  style?: CSSProperties;
};

const LoadingPanel = ({
  className,
  style
}: TLoadingPanelProps): JSX.Element => (
  <FadeIn timing="0.6s">
    <div data-testid="loading-panel" className={className} style={style} />
  </FadeIn>
);

export default styled(LoadingPanel)<{
  borderRadius?: string;
  height?: string;
  margin?: string;
  maxWidth?: string;
  width?: string;
}>`
  border-radius: ${({ borderRadius }) => borderRadius || "0px"};
  height: ${({ height }) => height || "252px"};
  max-width: ${({ maxWidth }) => maxWidth || "auto"};
  margin: ${({ margin }) => margin || "0px"};
  width: ${({ width }) => width || "100%"};
  animation: pulse 1.2s infinite;
`;
