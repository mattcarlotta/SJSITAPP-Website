import React from "react";
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles"; // Theme
import Tooltip from "@material-ui/core/Tooltip";
import { GoQuestion } from "react-icons/go";
import TooltipText from "~components/Layout/TooltipText";
import { CSSProperties, FC } from "~types";

export interface ILabelProps {
  className?: string;
  name?: string;
  label?: any;
  style?: CSSProperties;
  tooltip?: string;
}

const useStylesBootstrap = makeStyles(() => ({
  arrow: {
    color: "#025f6d"
  },
  tooltip: {
    backgroundColor: "#025f6d",
    boxShadow: "0px 0px 14px -2px #14d3e2",
    border: "2px solid #3794a5"
  }
}));

const LabelComponent: FC<ILabelProps> = ({
  className,
  name,
  label,
  style,
  tooltip
}): JSX.Element => {
  const classes = useStylesBootstrap();

  return (
    <label className={className} style={style} htmlFor={name}>
      {label}
      {tooltip && (
        <span className="tooltip">
          <Tooltip
            arrow
            classes={classes}
            placement="top"
            title={<TooltipText>{tooltip}</TooltipText>}
          >
            <span>
              <GoQuestion />
            </span>
          </Tooltip>
        </span>
      )}
    </label>
  );
};

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
