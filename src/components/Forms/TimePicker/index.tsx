import { makeStyles, Theme } from "@material-ui/core";
import { TimePicker } from "@material-ui/pickers";
import Errors from "~components/Forms/Errors";
import Label from "~components/Forms/Label";
import Icon from "~components/Layout/Icon";
import { timestampFormat } from "~utils/dateFormats";
import { CSSProperties, EventTarget, Moment, ReactNode } from "~types";

export type TTimePickerProps = {
  background?: string;
  emptyLabel: string;
  errors?: string;
  format: string;
  name: string;
  label?: ReactNode;
  onChange: ({ target: { name, value } }: EventTarget) => void;
  onFieldRemove?: (name: string) => void;
  style?: CSSProperties;
  tooltip?: string;
  value?: string | null;
};

const useStyles = makeStyles<Theme, { errors?: string }>({
  root: {
    width: "100%",
    "& .MuiInput-input": {
      fontSize: 16,
      cursor: "pointer",
      border: ({ errors }) => (!errors ? "1px solid #ccc" : "1px solid red"),
      background: "#fff",
      borderRadius: 5,
      padding: 10,
      textAlign: "center",
      transition: "all 300ms ease-in-out",
      fontFamily: `"Karla", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;`
    },
    "& .MuiInput-input:hover": {
      background: "#fff",
      borderColor: "#1e90ff",
      boxShadow: "0px 0px 14px -2px #a1cdf9"
    },
    "& .MuiFormHelperText-root.Mui-error": {
      display: "none"
    },
    "& .MuiInput-underline:before, & .MuiInput-underline:after": {
      display: "none"
    }
  }
});

const TimePickerComponent = ({
  emptyLabel,
  errors,
  format,
  label,
  name,
  onChange,
  onFieldRemove,
  style,
  tooltip,
  value
}: TTimePickerProps): JSX.Element => (
  <div style={{ width: 125, position: "relative", ...style }}>
    {label && <Label name={name} label={label} tooltip={tooltip} />}
    {onFieldRemove && (
      <Icon
        className="remove-time-slot"
        dataTestId="remove-time-slot"
        style={{ cursor: "pointer", top: "12px", right: "15px" }}
        color="rgba(255, 0, 0, 0.65)"
        onHoverColor="rgba(204, 0, 0, 0.65)"
        onClick={() => onFieldRemove(name)}
        type="remove"
      />
    )}
    <TimePicker
      name={name}
      format={format}
      className={useStyles({ errors }).root}
      value={value}
      emptyLabel={emptyLabel}
      onChange={value =>
        onChange({ target: { name, value: (value as Moment).format() } })
      }
    />
    {errors && <Errors data-testid="errors">{errors}</Errors>}
  </div>
);

TimePickerComponent.defaultProps = {
  format: timestampFormat,
  emptyLabel: "Please select a time..."
};

export default TimePickerComponent;
