import * as React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import FadeIn from "~components/Layout/FadeIn";
import Spinner from "~components/Layout/Spinner";
import { ComponentType, FC } from "~types";
import { TRootState } from "~reducers";

export interface IRequireAuthProps {
  email: string;
  isLoading: boolean;
  role: string;
}

const checkForSession = (WrappedComponent: ComponentType<any>): any => {
  const RedirectToDashboard: FC<IRequireAuthProps> = ({ isLoading, role }) => {
    const router = useRouter();
    const isMember = role && role !== "guest";

    React.useEffect(() => {
      if (!isLoading && isMember) router.replace("/employee/dashboard");
    }, [isLoading, role]);

    return !isLoading && !isMember ? (
      <WrappedComponent />
    ) : (
      <FadeIn style={{ height: "100%" }} timing="1.5s">
        <Spinner />
      </FadeIn>
    );
  };

  /* istanbul ignore next */
  const mapStateToProps = (state: TRootState) => ({
    role: state.auth.role
  });

  // { signoutUser }
  return connect(mapStateToProps)(RedirectToDashboard);
};

export default checkForSession;
