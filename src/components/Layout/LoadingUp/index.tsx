/* istanbul ignore file */
import * as React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const LoadingUpComponent = ({
  className
}: {
  className?: string;
}): JSX.Element => (
  <>
    <div className={className}>
      <div className="spinner" />
    </div>
    <div
      css={css`
        animation: loading 1.2s infinite 0s ease-in-out;
        animation-direction: alternate;
        position: relative;
        top: -110px;
        color: #fff;
        font-size: 15px;
        margin-top: 2px;
      `}
    >
      SHARKS ICE TEAM
    </div>
  </>
);

const LoadingUp = styled(LoadingUpComponent)`
  font-size: 0;
  width: 200px;
  height: 200px;

  .spinner {
    width: 100%;
    height: 100%;
    background-color: #131313;
    border-style: dashed;
    border-color: #424242;
    border-width: 5px;
    border-radius: 100%;
    animation: rotate 3s linear infinite;

    :after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: "";
      border: 7px solid #0d6472;
      border-radius: 100%;
    }
  }
`;

export default LoadingUp;
