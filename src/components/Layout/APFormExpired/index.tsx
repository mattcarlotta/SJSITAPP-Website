import FlexCenter from "~components/Layout/FlexCenter";
import Center from "~components/Layout/Center";
import { RiFileForbidLine } from "~icons";
import { CSSProperties } from "~types";

const iconStyle = {
  fontSize: 60,
  marginBottom: 5
} as CSSProperties;

const APFormExpired = (): JSX.Element => (
  <FlexCenter
    data-testid="expired-form"
    height="85px"
    direction="column"
    justify="center"
    style={{ color: "#999" }}
  >
    <div data-testid="expired-form-icon">
      <RiFileForbidLine style={iconStyle} />
    </div>
    <Center data-testid="expired-form-message">
      Form has expired and is no longer viewable.
    </Center>
  </FlexCenter>
);

export default APFormExpired;
