import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import AppLayout from "~containers/App/Layout";
// import Spinner from "~components/Layout/Spinner";
import FlexCenter from "~components/Layout/FlexCenter";
// import FadeIn from "~components/Layout/FadeIn";
import LoadingUp from "~components/Layout/LoadingUp";
import WhiteBackground from "~components/Layout/WhiteBackground";
import { ComponentType } from "~types";

export interface IRequireAuthProps {
  email: string;
  role: string;
}

const requiresBasicCredentials = (
  AppPage: ComponentType<any>
): ComponentType<any> => {
  const RequiresAuthentication = () => {
    const router = useRouter();
    const { email, role } = useSelector(({ auth }) => auth);
    const isGuest = role && role === "guest";

    React.useEffect(() => {
      if (isGuest) router.replace("/employee/login");
    }, [isGuest]);

    return email && !isGuest ? (
      <AppLayout>
        <AppPage />
      </AppLayout>
    ) : (
      <WhiteBackground data-testid="loading">
        <FlexCenter justify="center" height="90vh" direction="column">
          <LoadingUp />
        </FlexCenter>
      </WhiteBackground>
    );
  };

  return RequiresAuthentication;
};

export default requiresBasicCredentials;
