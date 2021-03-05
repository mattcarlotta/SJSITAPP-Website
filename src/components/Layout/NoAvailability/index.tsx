import Center from "~components/Layout/Center";
import FlexCenter from "~components/Layout/FlexCenter";
import { MdAccessTime } from "~icons";
import { CSSProperties } from "~types";

const iconStyle = {
  fontSize: 70,
  marginBottom: 5
} as CSSProperties;

const NoAvailability = (): JSX.Element => (
  <FlexCenter
    data-testid="no-availability"
    height="110px"
    direction="column"
    justify="center"
    style={{ color: "#999" }}
  >
    <div data-testid="no-availability-icon">
      <MdAccessTime style={iconStyle} />
    </div>
    <Center data-testid="no-availability-message">
      There isn&apos;t any availabity for this month
    </Center>
  </FlexCenter>
);

export default NoAvailability;
