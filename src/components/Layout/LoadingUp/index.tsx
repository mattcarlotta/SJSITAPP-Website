/* istanbul ignore file */
import * as React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import WarpedText from "~components/Layout/WarpedText";
import { ReactNode } from "~types";

export type TLoadingUpComponentProps = {
  className?: string;
  children?: ReactNode | boolean;
};

const LoadingUpComponent = ({
  className,
  children
}: TLoadingUpComponentProps): JSX.Element => (
  <>
    <div data-testid="spinner" className={className}>
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
      <img src="/images/logo_64x64.png" height="48px" alt="logo" />
    </div>
    <div
      css={css`
        position: relative;
        top: -200px;
      `}
    >
      {children}
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
    border-style: solid;
    border-color: #424242;
    border-width: 5px;
    border-radius: 100%;
    animation: rotate 3s linear infinite;
    box-shadow: 0px 9px 6px -1px rgba(32, 67, 119, 0.5);

    :before {
      position: absolute;
      top: 17.5%;
      left: 17.5%;
      width: 65%;
      height: 65%;
      content: "";
      border: 2px solid #ddd;
      background: #131313;
      border-radius: 100%;
    }

    :after {
      position: absolute;
      top: 27.5%;
      left: 27.5%;
      width: 45%;
      height: 45%;
      content: "";
      border: 2px solid #888;
      background: #fff;
      border-radius: 100%;
    }
  }
`;

export default LoadingUp;
