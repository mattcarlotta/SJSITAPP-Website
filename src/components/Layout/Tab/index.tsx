import { withStyles, createStyles } from "@material-ui/core/styles";
import { Tab } from "@material-ui/core";
import { ReactNode } from "~types";

export const a11yProps = (
  index: number
): { id: string; "aria-controls": string } => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`
});

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
    },
    wrapper: {
      flexDirection: "row"
    }
  })
)(
  ({
    dataTestId,
    index,
    tab,
    ...rest
  }: {
    dataTestId: string;
    index: number;
    disabled?: boolean;
    label: ReactNode;
    tab: number;
  }) => (
    <Tab
      data-testid={dataTestId}
      disabled={tab === index}
      {...a11yProps(index)}
      {...rest}
    />
  )
);

export default AntTab;
