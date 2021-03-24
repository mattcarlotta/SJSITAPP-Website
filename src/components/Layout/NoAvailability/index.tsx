import Center from "~components/Layout/Center";
import FlexCenter from "~components/Layout/FlexCenter";
import { MdAccessTime } from "~icons";
import { CSSProperties } from "~types";

const iconStyle = {
  fontSize: 70,
  marginBottom: 5
} as CSSProperties;

const NoAvailability = ({ height }: { height?: string }): JSX.Element => (
  <FlexCenter
    data-testid="no-availability"
    height={height || "120px"}
    direction="column"
    justify="center"
    color="#999"
  >
    <Center data-testid="no-availability-icon">
      <MdAccessTime style={iconStyle} />
    </Center>
    <Center data-testid="no-availability-message">
      No availabity was found for this month
    </Center>
  </FlexCenter>
);

export default NoAvailability;
