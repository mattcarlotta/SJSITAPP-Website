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
    <div className={className} style={style} />
  </FadeIn>
);

export default styled(LoadingPanel)<{ height?: string }>`
  height: ${({ height }) => height || "252px"};
  width: 100%;
  -webkit-animation: pulse 1.2s infinite;
  animation: pulse 1.2s infinite;
`;
