import { makeStyles, Select } from "@material-ui/core";
import { ChangeEvent } from "~types";

export type TNativeSelectProps = {
  name: string;
  options: Array<string>;
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
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
      paddingLeft: 15,
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

const NativeSelect = ({
  name,
  options,
  value,
  onChange
}: TNativeSelectProps): JSX.Element => (
  <Select
    native
    name={name}
    className={useStyles().root}
    value={value}
    onChange={onChange}
  >
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </Select>
);

export default NativeSelect;
