import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import AppLayout from "~containers/App/Layout";
import FadeIn from "~components/Layout/FadeIn";
import PuckSpinner from "~components/Layout/PuckSpinner";
import Submitting from "~components/Layout/Submitting";
import { ComponentType } from "~types";

export interface IRequireAuthProps {
  email: string;
  role: string;
}

const requiresStaffCredentials = (
  AppPage: ComponentType<any>
): ComponentType<any> => {
  const RequiresAuthentication = () => {
    const router = useRouter();
    const { email, role } = useSelector(({ auth }) => auth);
    const accessRestricted = role && (role === "guest" || role === "member");

    React.useEffect(() => {
      if (accessRestricted) router.replace("/employee/login");
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [accessRestricted]);

    return email && !accessRestricted ? (
      <AppLayout>
        <AppPage />
      </AppLayout>
    ) : (
      <FadeIn timing="1s">
        <PuckSpinner>
          <Submitting
            style={{
              background: "#000",
              width: "180px",
              position: "relative",
              top: "-20px"
            }}
          />
        </PuckSpinner>
      </FadeIn>
    );
  };

  return RequiresAuthentication;
};

export default requiresStaffCredentials;
