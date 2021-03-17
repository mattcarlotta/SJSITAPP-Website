/* istanbul ignore file */
import * as React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import WarpedText from "~components/Layout/WarpedText";

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
        animation: rotate 3s linear infinite;
        position: relative;
        top: -200px;
      `}
    >
      <WarpedText />
    </div>
    <div
      css={css`
        animation: rotate 3s linear infinite;
        position: relative;
        top: -320px;
        opacity: 0.9;
      `}
    >
      <img src="/logo_64x64.png" height="48px" alt="logo" />
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

    :before {
      position: absolute;
      top: 17.5%;
      left: 17.5%;
      width: 65%;
      height: 65%;
      content: "";
      border: 2px solid #ddd;
      background: #999;
      border-radius: 100%;
    }

    :after {
      position: absolute;
      top: 25%;
      left: 25%;
      width: 50%;
      height: 50%;
      content: "";
      border: 2px solid #888;
      background: #fff;
      border-radius: 100%;
    }
  }
`;

export default LoadingUp;
