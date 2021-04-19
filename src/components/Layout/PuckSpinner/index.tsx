import FlexCenter from "~components/Layout/FlexCenter";
import LoadingUp from "~components/Layout/LoadingUp";
import WhiteBackground from "~components/Layout/WhiteBackground";
import { ReactElement, ReactNode } from "~types";

export type TPuckSpinnerProps = {
  children?: ReactNode;
};

const PuckSpinner = ({ children }: TPuckSpinnerProps): ReactElement => (
  <WhiteBackground data-testid="loading">
    <FlexCenter justify="center" height="115vh" direction="column">
      <LoadingUp>{children}</LoadingUp>
    </FlexCenter>
  </WhiteBackground>
);

export default PuckSpinner;
