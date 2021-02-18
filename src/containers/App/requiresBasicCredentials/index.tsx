import * as React from "react";
import { useSelector } from "react-redux";
// import Router, { withRouter } from "next/router";
import { useRouter } from "next/router";
import toast from "~components/App/Toast";
// import AppLayout from "~components/App";
// import { signoutUser } from "~actions/Auth";
import Spinner from "~components/Layout/Spinner";
import FadeIn from "~components/Layout/FadeIn";
import { ComponentType, FC } from "~types";

export interface IRequireAuthProps {
  email: string;
  role: string;
}

const requiresBasicCredentials = (
  WrappedComponent: ComponentType<any>
): ComponentType<any> => {
  const RequiresAuthentication: FC = () => {
    const router = useRouter();
    const { email, role } = useSelector(({ auth }) => auth);
    const isGuest = role && role === "guest";

    React.useEffect(() => {
      if (isGuest) {
        toast({
          type: "error",
          message:
            "Your access to the requested page was denied. You do not have the correct account permissions to view that page."
        });

        router.replace("/employee/login");
      }
    }, [isGuest]);

    return email && !isGuest ? (
      <WrappedComponent />
    ) : (
      <FadeIn style={{ height: "100%" }} timing="1.5s">
        <Spinner />
      </FadeIn>
    );
  };

  // { signoutUser }
  return RequiresAuthentication;
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
