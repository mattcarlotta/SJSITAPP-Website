import { Tabs, withStyles } from "@material-ui/core";
import { ChangeEvent } from "~types";

export type TAntTabsProps = {
  "aria-label": string;
  value: number;
  variant: "fullWidth" | "standard" | "scrollable";
  onChange: (_: ChangeEvent<any>, tab: number) => void;
};

const AntTabs = withStyles({
  root: {
    background: "#025f6d"
  },
  indicator: {
    display: "none",
    justifyContent: "center",
    "& > span": {
      maxWidth: 100,
      width: "100%",
      backgroundColor: "#fff"
    }
  }
})((props: TAntTabsProps) => <Tabs {...props} />);

export default AntTabs;
