import React from "react";
import styled from "@emotion/styled";
import Tooltip from "@material-ui/core/Tooltip";
import { GoQuestion } from "react-icons/go";
import Center from "~components/Layout/Center";
import { CSSProperties, FC } from "~types";

export interface ILabelProps {
  className?: string;
  name?: string;
  label?: any;
  style?: CSSProperties;
  tooltip?: string;
}

const LabelComponent: FC<ILabelProps> = ({
  className,
  name,
  label,
  style,
  tooltip
}): JSX.Element => (
  <label className={className} style={style} htmlFor={name}>
    {label}
    {tooltip && (
      <span className="tooltip">
        <Tooltip placement="top" title={<Center>{tooltip}</Center>}>
          <GoQuestion />
        </Tooltip>
      </span>
    )}
  </label>
);

const Label = styled(LabelComponent)`
  color: #010404;
  display: block;
  margin-bottom: 15px;
  height: 15px;
  line-height: 20px;
  font-size: 20px;

  & .tooltip {
    margin-left: 5px;

    svg {
      font-size: 16px;
      color: #bbb !important;
      position: relative;
      top: 0;
      left: 0;

      &:hover {
        color: #282c34 !important;
      }
    }
  }
`;

export default Label;
