import FlexCenter from "~components/Layout/FlexCenter";
import Center from "~components/Layout/Center";
import { FaChartBar } from "~icons";
import { CSSProperties } from "~types";

const iconStyle = {
  fontSize: 70
} as CSSProperties;

const NoEventDistribitionData = (): JSX.Element => (
  <FlexCenter
    data-testid="no-event-distribution"
    height="635px"
    direction="column"
    justify="center"
    color="#999"
  >
    <Center data-testid="no-event-distribution-icon">
      <FaChartBar style={iconStyle} />
    </Center>
    <Center data-testid="no-event-distribution-message">
      No event distribution data was found matching the selected dates
    </Center>
  </FlexCenter>
);

export default NoEventDistribitionData;
