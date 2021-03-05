import Center from "~components/Layout/Center";
import FlexCenter from "~components/Layout/FlexCenter";
import { MdAssignment } from "~icons";
import { CSSProperties } from "~types";

const iconStyle = {
  fontSize: 70
} as CSSProperties;

const NoForms = (): JSX.Element => (
  <FlexCenter
    data-testid="no-forms"
    height="200px"
    direction="column"
    justify="center"
    style={{ color: "#999" }}
  >
    <div data-testid="no-forms-icon">
      <MdAssignment style={iconStyle} />
    </div>
    <Center data-testid="no-forms-message">
      There aren&apos;t any forms for this month
    </Center>
  </FlexCenter>
);

export default NoForms;
