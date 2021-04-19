import FlexCenter from "~components/Layout/FlexCenter";
import { RiLineChartLine } from "~icons";
import { CSSProperties, ReactElement } from "~types";

const iconStyle = {
  fontSize: 70,
  marginBottom: 5
} as CSSProperties;

const NoTableData = (): ReactElement => (
  <FlexCenter
    data-testid="no-table-data"
    margin="225px 0 0 0"
    direction="column"
    justify="center"
    color="#b9b9b9"
  >
    <RiLineChartLine data-testid="no-availability-icon" style={iconStyle} />
    <div data-testid="no-availability-message">No data</div>
  </FlexCenter>
);

export default NoTableData;
