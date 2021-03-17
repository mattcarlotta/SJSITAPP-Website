import FlexCenter from "~components/Layout/FlexCenter";
import LoadingUp from "~components/Layout/LoadingUp";
import WhiteBackground from "~components/Layout/WhiteBackground";
import { ReactNode } from "~types";

export type TPuckSpinnerProps = {
  children?: ReactNode | boolean;
};

const PuckSpinner = ({ children }: TPuckSpinnerProps): JSX.Element => (
  <WhiteBackground data-testid="loading">
    <FlexCenter justify="center" height="115vh" direction="column">
      <LoadingUp>{children}</LoadingUp>
    </FlexCenter>
  </WhiteBackground>
);

export default PuckSpinner;
