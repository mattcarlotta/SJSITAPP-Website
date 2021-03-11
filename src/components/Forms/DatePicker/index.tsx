import { makeStyles } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { DatePickerView, MaterialUiPickersDate } from "~types";

export type TDatePickerProps = {
  name: string;
  onChange: ({
    name,
    value
  }: {
    name: string;
    value: MaterialUiPickersDate;
  }) => void;
  value: string;
  views?: Array<DatePickerView>;
};

const useStyles = makeStyles({
  root: {
    width: 125,
    "& .MuiInput-input": {
      fontSize: 16,
      cursor: "pointer",
      border: "1px solid #888",
      background: "#eee",
      borderRadius: 10,
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
    "& .MuiInput-underline:before, & .MuiInput-underline:after": {
      display: "none"
    }
  }
});

const DatePickerComponent = ({
  name,
  onChange,
  value,
  views
}: TDatePickerProps): JSX.Element => (
  <DatePicker
    name={name}
    views={views}
    format="MM/DD/YYYY"
    className={useStyles().root}
    value={value}
    onChange={value => onChange({ name, value })}
  />
);

export default DatePickerComponent;
