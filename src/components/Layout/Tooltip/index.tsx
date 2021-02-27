import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import TooltipText from "~components/Layout/TooltipText";
import { ReactNode } from "~types";

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
  title: string;
};

const CustomTooltip = ({
  children,
  title
}: TCustomTooltipProps): JSX.Element => {
  const classes = useClasses();

  return (
    <span className="tooltip">
      <Tooltip
        arrow
        classes={classes}
        placement="top"
        title={<TooltipText>{title}</TooltipText>}
      >
        <span>{children}</span>
      </Tooltip>
    </span>
  );
};

export default CustomTooltip;
