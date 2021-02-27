import { withStyles, createStyles } from "@material-ui/core/styles";
import { Tab } from "@material-ui/core";

const AntTab = withStyles(() =>
  createStyles({
    root: {
      padding: "0 10px",
      textTransform: "none",
      minWidth: 72,
      minHeight: 35,
      fontWeight: 400,
      fontSize: 15,
      marginRight: 8,
      color: "#222",
      transition: "color 300ms",
      "&:hover": {
        color: "#40a9ff"
      },
      "&:focus": {
        color: "#40a9ff"
      }
    },
    selected: {
      color: "#1890ff",
      background: "#fff",
      fontWeight: 500
    },
    textColorInherit: {
      "&:disabled": {
        opacity: 1,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
      }
    }
  })
)((props: { disabled?: boolean; label: string }) => <Tab {...props} />);

export default AntTab;
