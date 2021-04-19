import FlexCenter from "~components/Layout/FlexCenter";
import Center from "~components/Layout/Center";
import { RiFileForbidLine } from "~icons";
import { ReactElement } from "~types";

const APFormExpired = (): ReactElement => (
  <FlexCenter
    data-testid="expired-form"
    height="140px"
    direction="column"
    justify="center"
    color="#999"
  >
    <Center data-testid="expired-form-icon">
      <RiFileForbidLine style={{ fontSize: 60, marginBottom: 5 }} />
    </Center>
    <Center data-testid="expired-form-message">
      This form has expired and is no longer viewable.
    </Center>
  </FlexCenter>
);

export default APFormExpired;
