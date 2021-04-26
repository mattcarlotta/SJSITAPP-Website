import Center from "~components/Layout/Center";
import FlexCenter from "~components/Layout/FlexCenter";
import { MdAssignment } from "~icons";
import { CSSProperties, ReactElement } from "~types";

const iconStyle = {
  fontSize: 70
} as CSSProperties;

const NoForms = (): ReactElement => (
  <FlexCenter
    data-testid="no-forms"
    height="190px"
    direction="column"
    justify="center"
    color="#999"
  >
    <div data-testid="no-forms-icon">
      <MdAssignment style={iconStyle} />
    </div>
    <Center data-testid="no-forms-message">
      There aren&#39;t any forms for this month
    </Center>
  </FlexCenter>
);

export default NoForms;
