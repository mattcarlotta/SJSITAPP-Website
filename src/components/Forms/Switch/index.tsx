import styled from "@emotion/styled";
import { Switch as MuiSwitch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Label from "~components/Forms/Label";
import { EventTarget, CSSProperties, ReactNode } from "~types";

export type TComponentProps = {
  className?: string;
  errors?: string;
  label?: ReactNode;
  name: string;
  onChange: ({ target: { name, value: checked } }: EventTarget) => void;
  value?: boolean;
  style?: CSSProperties;
  tooltip?: string;
};

const useStyles = makeStyles({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: 0
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none"
      }
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff"
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: "13px",
    border: "1px solid #bdbdbd",
    backgroundColor: "#fafafa",
    opacity: 1,
    transition:
      "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
  },
  checked: {},
  focusVisible: {}
});

const SwitchComponent = ({
  className,
  label,
  name,
  onChange,
  value,
  style,
  tooltip
}: TComponentProps) => {
  const classes = useStyles();
  return (
    <div data-testid="switch-container" className={className} style={style}>
      <Label name={name} label={label} tooltip={tooltip} />
      <MuiSwitch
        id={name}
        aria-label={name}
        data-testid={name}
        checked={value}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked
        }}
        disableFocusRipple
        focusVisibleClassName={classes.focusVisible}
        name={name}
        color="primary"
        inputProps={{ "aria-label": `${name} checkbox` }}
        onChange={({ target: { checked } }) =>
          onChange({ target: { name, value: checked } })
        }
      />
    </div>
  );
};

const Switch = styled(SwitchComponent)`
  height: 65px;
  margin-bottom: 15px;
`;

export default Switch;
