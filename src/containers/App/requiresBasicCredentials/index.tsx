import * as React from "react";
import { connect } from "react-redux";
// import Router, { withRouter } from "next/router";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
// import AppLayout from "~components/App";
// import { signoutUser } from "~actions/Auth";
import Spinner from "~components/Layout/Spinner";
import FadeIn from "~components/Layout/FadeIn";
import { ComponentType, FC } from "~types";
import { TRootState } from "~reducers";

export interface IRequireAuthProps {
  email: string;
  isLoading: boolean;
  role: string;
}

const requiresBasicCredentials = (
  WrappedComponent: ComponentType<any>
): ComponentType<any> => {
  const RequiresAuthentication: FC<IRequireAuthProps> = ({
    email,
    isLoading,
    role
  }) => {
    const router = useRouter();
    const isGuest = role && role === "guest";

    React.useEffect(() => {
      if (!isLoading && isGuest) {
        toast({
          type: "error",
          message:
            "Your access to the requested page was denied. You do not have the correct account permissions."
        });

        router.replace("/employee/login");
      }
    }, [isLoading]);

    return !isLoading && email && !isGuest ? (
      <WrappedComponent />
    ) : (
      <FadeIn style={{ height: "100%" }} timing="1.5s">
        <Spinner />
      </FadeIn>
    );
  };

  /* istanbul ignore next */
  const mapStateToProps = (state: TRootState) => ({
    email: state.auth.email,
    isLoading: state.app.isLoading,
    role: state.auth.role
  });

  // { signoutUser }
  return connect(mapStateToProps)(RequiresAuthentication);
};

export default requiresBasicCredentials;

/*
class RequiresAuthentication extends Component {
		static getInitialProps = async ctx => {
			const {
				store: { getState },
			} = ctx;
			const { role, email } = getState().auth;
			const { getInitialProps } = WrappedComponent;

			if (role === "guest" || !email) return { serverError: accessDenied };

			if (getInitialProps) return getInitialProps(ctx);
		};

		componentDidMount = () => {
			const { email, serverError, signoutUser, router } = this.props;

			if (serverError) {
				if (
					serverError.indexOf("account was revoked") >= 0 ||
					serverError.indexOf(
						"There was a problem with your login credentials",
					) >= 0
				) {
					signoutUser();
				} else if (!email || router.pathname !== "/employee/dashboard") {
					Router.push("/employee/login");
				}

				toast({ type: "error", message: serverError });
			}
		};

		render = () =>
			this.props.email && this.props.role && this.props.role !== "guest" ? (
					<WrappedComponent {...this.props} />
			) : (
					<Spinner />
			);
	}
*/
