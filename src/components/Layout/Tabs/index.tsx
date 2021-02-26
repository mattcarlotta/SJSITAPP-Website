import { withStyles } from "@material-ui/core/styles";
import { Tabs } from "@material-ui/core";

export type TAntTabsProps = {
  "aria-label": string;
  value: number;
  variant: "fullWidth" | "standard" | "scrollable";
  onChange: (_: any, tab: number) => void;
};

const AntTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 80,
      width: "100%",
      backgroundColor: "#635ee7"
    }
  }
})((props: TAntTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

export default AntTabs;
