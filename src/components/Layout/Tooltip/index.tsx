import { Tooltip, makeStyles } from "@material-ui/core";
import TooltipText from "~components/Layout/TooltipText";
import { CSSProperties, ReactNode } from "~types";

export type TTooltipPlacement =
  | "bottom"
  | "left"
  | "right"
  | "top"
  | "bottom-end"
  | "bottom-start"
  | "left-end"
  | "left-start"
  | "right-end"
  | "right-start"
  | "top-end"
  | "top-start"
  | undefined;

const useClasses = makeStyles(() => ({
  arrow: {
    color: "#025f6d"
  },
  tooltip: {
    backgroundColor: "#025f6d",
    boxShadow: "0px 0px 14px -2px #14d3e2",
    border: "2px solid #3794a5"
  }
}));

export type TCustomTooltipProps = {
  children: ReactNode;
  placement: TTooltipPlacement;
  title: ReactNode;
  styles?: CSSProperties;
};

const CustomTooltip = ({
  children,
  placement,
  title,
  styles
}: TCustomTooltipProps): JSX.Element => {
  const classes = useClasses();

  return (
    <div className="tooltip" style={{ display: "inline-block", ...styles }}>
      <Tooltip
        arrow
        classes={classes}
        placement={placement}
        title={<TooltipText>{title}</TooltipText>}
      >
        <div>{children}</div>
      </Tooltip>
    </div>
  );
};

CustomTooltip.defaultProps = {
  placement: "top"
};

export default CustomTooltip;
