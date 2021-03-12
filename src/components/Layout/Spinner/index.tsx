import * as React from "react";
import styled from "@emotion/styled";
import FlexCenter from "~components/Layout/FlexCenter";
import HomeLogo from "~components/Layout/HomeLogo";
import { ReactNode } from "~types";

export interface ISpinnerState {
  isMounted: boolean;
  isIE: boolean;
  isEdge: boolean;
}

export interface ISpinnerProps {
  className?: string;
  children?: ReactNode | boolean;
}

export class SpinnerComponent extends React.Component<
  ISpinnerProps,
  ISpinnerState
> {
  state = { isMounted: false, isIE: false, isEdge: false };

  componentDidMount(): void {
    const isIE = /* @cc_on!@ */ false || !!(document as any).documentMode;
    const isEdge = !isIE && !!window.StyleMedia;
    this.setState({ isMounted: true, isIE, isEdge });
  }

  render = (): JSX.Element => {
    const { isEdge, isIE, isMounted } = this.state;
    const { className, children } = this.props;

    return (
      <div data-testid="spinner" className={className}>
        {!isMounted ? null : isIE || isEdge ? (
          <FlexCenter height="100%" justify="center" direction="column">
            <HomeLogo
              src="/images/staticIceTeamLogo.png"
              alt="StaticIceTeamLogo.png"
            />
            {children}
          </FlexCenter>
        ) : (
          <div className="container">
            <div className="text-wrapper">
              <span className="text sharks" data-text="sharks">
                sharks
              </span>
              <span className="gradient"></span>
              <span className="spotlight"></span>
            </div>
            <div className="text-wrapper">
              <span className="text iceteam" data-text="ice team">
                ice team
              </span>
              <span className="gradient"></span>
              <span className="spotlight"></span>
            </div>
            {children}
          </div>
        )}
      </div>
    );
  };
}

const Spinner = styled(SpinnerComponent)`
  @media (max-width: 600px) {
    .sharks {
      font-size: 55px !important;
    }

    .iceteam {
      font-size: 48px !important;
    }
  }

  @keyframes light {
    to {
      transform: translate(50%, 50%);
    }
  }

  background: #010404;
  height: 100%;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90%;
  }

  .text-wrapper {
    position: relative;
    overflow: hidden;
    filter: brightness(200%);
  }

  & .text {
    display: flex;
    background-color: black;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    position: relative;
    user-select: none;

    :before {
      content: attr(data-text);
      position: absolute;
      filter: blur(0.02em);
      mix-blend-mode: difference;
    }
  }

  & .sharks {
    font-size: 9vw;
  }

  & .iceteam {
    font-size: 8.75vw;
  }

  & .gradient {
    position: absolute;
    background: linear-gradient(
      115deg,
      rgba(6, 227, 250, 1) 5%,
      rgba(229, 151, 64, 1) 98%
    );
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    mix-blend-mode: multiply;
  }

  & .spotlight {
    position: absolute;
    top: -100%;
    left: -100%;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, white, transparent 25%) center / 25% 25%,
      radial-gradient(circle, white, black 25%) center / 12.5% 12.5%;
    animation: light 6s linear infinite;
    mix-blend-mode: color-dodge;
  }
`;

export default Spinner;
