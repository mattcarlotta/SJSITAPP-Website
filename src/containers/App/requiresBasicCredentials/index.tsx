import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import AppLayout from "~containers/App/Layout";
// import Spinner from "~components/Layout/Spinner";
import FadeIn from "~components/Layout/FadeIn";
import { ComponentType } from "~types";
import WhiteBackground from "~components/Layout/WhiteBackground";

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
      <WhiteBackground>
        <FadeIn height="100%" timing="1.5s">
          <div>Loading...</div>
        </FadeIn>
      </WhiteBackground>
    );
  };

  return RequiresAuthentication;
};

export default requiresBasicCredentials;
