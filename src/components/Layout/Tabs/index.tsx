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
})((props: TAntTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

export default AntTabs;
