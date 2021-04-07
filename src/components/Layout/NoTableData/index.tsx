import { GridOverlay } from "@material-ui/data-grid";
import { RiLineChartLine } from "~icons";
import { CSSProperties } from "~types";

const iconStyle = {
  fontSize: 70,
  marginBottom: 5
} as CSSProperties;

const NoTableData = (): JSX.Element => (
  <GridOverlay
    data-testid="no-table-data"
    style={{ flexDirection: "column", color: "#b9b9b9" }}
  >
    <RiLineChartLine data-testid="no-availability-icon" style={iconStyle} />
    <div data-testid="no-availability-message">No data</div>
  </GridOverlay>
);

export default NoTableData;
