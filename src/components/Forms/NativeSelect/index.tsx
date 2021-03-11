import { makeStyles, Select, MenuItem } from "@material-ui/core";

export type TNativeSelectProps = {
  name: string;
  options: Array<string> | Array<number>;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
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
      paddingLeft: 20,
      transition: "all 300ms ease-in-out",
      fontFamily: `"Karla", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;`
    },
    "& .MuiSelect-icon": {
      top: "calc(50% - 15px)"
    },
    "& .MuiInput-input:hover": {
      background: "#fff",
      borderColor: "#1e90ff",
      boxShadow: "0px 0px 14px -2px #a1cdf9"
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
    disableUnderline
    data-testid={name}
    name={name}
    className={useStyles().root}
    value={value}
    onChange={({ target: { name, value } }) =>
      onChange({
        name: name as string,
        value: value as string
      })
    }
    IconComponent={() => null}
  >
    {options.map((option: string | number) => (
      <MenuItem data-testid={option} key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </Select>
);

export default NativeSelect;
