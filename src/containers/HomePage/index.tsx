import * as React from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import Spinner from "~components/Layout/Spinner";
import Link from "~components/Navigation/Link";
import Submitting from "~components/Layout/Submitting";
import Header from "~components/Navigation/Header";
import { IconContext, FaSignInAlt, MdDashboard } from "~icons";
import { NextPage } from "~types";

const Home: NextPage = () => {
  const router = useRouter();
  const { role } = useSelector(({ auth }) => auth);
  const hasSession = role !== "guest";
  const pushHref = !role
    ? ""
    : hasSession
    ? "/employee/dashboard"
    : "/employee/login";

  return (
    <IconContext.Provider
      value={{
        style: { position: "relative", top: 3, marginRight: 8, fontSize: 20 }
      }}
    >
      <Header title="Home" url="/" />
      <button
        data-testid="login"
        type="button"
        onClick={() => router.push("/login")}
      >
        Go to login
      </button>
      <button
        data-testid="dashboard"
        type="button"
        onClick={() => Router.push("/dashboard")}
      >
        Go to dashboard
      </button>
      <Spinner>
        <Link
          dataTestId="home-link"
          hideShadow
          href={pushHref}
          borderRadius="50px"
          fontSize="18px"
          margin="10px 0 0 0"
          padding="13px 18px"
          width="260px"
        >
          {!role ? (
            <Submitting style={{ height: "24px" }} />
          ) : hasSession ? (
            <>
              <MdDashboard />
              View Dashboard
            </>
          ) : (
            <>
              <FaSignInAlt />
              Employee Login
            </>
          )}
        </Link>
      </Spinner>
    </IconContext.Provider>
  );
};

export default Home;
