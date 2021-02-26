import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Tab } from "@material-ui/core";

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0 10px",
      textTransform: "none",
      minWidth: 72,
      minHeight: 40,
      fontWeight: 400,
      fontSize: 15,
      marginRight: 8,
      color: "#222",
      "&:hover": {
        color: "#40a9ff",
        opacity: 1
      },
      "&$selected": {
        color: "#1890ff",
        fontWeight: theme.typography.fontWeightMedium
      },
      "&:focus": {
        color: "#40a9ff"
      }
    },
    selected: {
      background: "rgba(0, 109, 118, 0.08)"
    }
  })
)((props: { label: string }) => <Tab {...props} />);

export default AntTab;
