import { withStyles, createStyles } from "@material-ui/core/styles";
import { Tab } from "@material-ui/core";

const AntTab = withStyles(() =>
  createStyles({
    root: {
      padding: "0 10px",
      textTransform: "capitalize",
      minWidth: 72,
      minHeight: 34,
      fontWeight: 400,
      fontSize: 16,
      marginRight: 8,
      color: "#ccc",
      transition: "color 300ms",
      "&:hover": {
        color: "#fff"
      },
      "&:focus": {
        color: "#fff"
      }
    },
    selected: {
      color: "#025f6d",
      background: "#fff",
      fontWeight: 500
    },
    textColorInherit: {
      opacity: 1,
      "&:disabled": {
        opacity: 1,
        color: "#025f6d",
        borderTopRightRadius: 4
      },
      "&:focus": {
        color: "#025f6d"
      }
    }
  })
)((props: { disabled?: boolean; label: string }) => (
  <Tab data-testid={`tab-${props.label}`} {...props} />
));

export default AntTab;
