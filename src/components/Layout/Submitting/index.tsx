import React from "react";
import styled from "@emotion/styled";
import { ComponentProps } from "~types";

const SubmittingComponent = ({ className, style }: ComponentProps) => (
  <div data-testid="loading" className={className} style={style}>
    <div className="bar1" />
    <div className="bar2" />
    <div className="bar3" />
  </div>
);

const Submitting = styled(SubmittingComponent)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  border-radius: 50px;
  cursor: wait;
  animation: fadeIn 0.5s 0s ease-in-out forwards;

  & > div {
    width: 10px;
    margin-right: 5px;
    animation: pop 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  & .bar1 {
    background-color: #0798af;
    animation-delay: -0.24s;
  }

  & .bar2 {
    background-color: #f2d40d;
    animation-delay: -0.12s;
  }

  & .bar3 {
    background-color: #f58311;
    animation-delay: 0s;
  }
`;

export default Submitting;
