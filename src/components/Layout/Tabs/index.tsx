import { withStyles } from "@material-ui/core/styles";
import { Tabs } from "@material-ui/core";

export type TAntTabsProps = {
  "aria-label": string;
  value: number;
  variant: "fullWidth" | "standard" | "scrollable";
  onChange: (_: any, tab: number) => void;
};

const AntTabs = withStyles({
  root: {
    background: "#f1f1f1"
  },
  indicator: {
    display: "none",
    justifyContent: "center",
    "& > span": {
      maxWidth: 100,
      width: "100%",
      backgroundColor: "#635ee7"
    }
  }
})((props: TAntTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

export default AntTabs;
