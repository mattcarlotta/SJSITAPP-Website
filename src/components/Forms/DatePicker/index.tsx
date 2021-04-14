import { makeStyles, Theme } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import Errors from "~components/Forms/Errors";
import Label from "~components/Forms/Label";
import { standardFormat } from "~utils/dateFormats";
import {
  CSSProperties,
  DatePickerView,
  EventTarget,
  Moment,
  ReactNode
} from "~types";

export type TDatePickerProps = {
  background?: string;
  emptyLabel: string;
  errors?: string;
  format: string;
  name: string;
  label?: ReactNode;
  onChange: ({ target: { name, value } }: EventTarget) => void;
  style?: CSSProperties;
  tooltip?: string;
  value?: string | null;
  views?: Array<DatePickerView>;
};

const useStyles = makeStyles<Theme, { background?: string; errors?: string }>({
  root: {
    width: "100%",
    "& .MuiInput-input": {
      fontSize: 16,
      cursor: "pointer",
      border: ({ errors }) => (!errors ? "1px solid #ccc" : "1px solid red"),
      background: ({ background }) => background || "#fff",
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

const DatePickerComponent = ({
  background,
  emptyLabel,
  errors,
  format,
  label,
  name,
  onChange,
  style,
  tooltip,
  value,
  views
}: TDatePickerProps): JSX.Element => (
  <div style={{ width: 125, ...style }}>
    {label && <Label name={name} label={label} tooltip={tooltip} />}
    <DatePicker
      name={name}
      views={views}
      format={format}
      className={useStyles({ background, errors }).root}
      value={value}
      emptyLabel={emptyLabel}
      onChange={value =>
        onChange({ target: { name, value: (value as Moment).format() } })
      }
    />
    {errors && <Errors data-testid="errors">{errors}</Errors>}
  </div>
);

DatePickerComponent.defaultProps = {
  format: standardFormat,
  emptyLabel: "Please select a date..."
};

export default DatePickerComponent;
