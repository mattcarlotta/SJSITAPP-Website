import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import AppLayout from "~containers/App/Layout";
import PuckSpinner from "~components/Layout/PuckSpinner";
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
      <PuckSpinner />
    );
  };

  return RequiresAuthentication;
};

export default requiresBasicCredentials;
