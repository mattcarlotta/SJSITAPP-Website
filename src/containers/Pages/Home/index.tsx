import * as React from "react";
import { useSelector } from "react-redux";
// import Spinner from "~components/Layout/Spinner";
import Link from "~components/Navigation/Link";
import Submitting from "~components/Layout/Submitting";
import Header from "~components/Navigation/Header";
import { IconContext, FaSignInAlt, MdDashboard } from "~icons";
import { NextPage } from "~types";
import PuckSpinner from "~components/Layout/PuckSpinner";

const Home: NextPage = () => {
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
      <PuckSpinner>
        <Link
          dataTestId="home-link"
          secondary
          href={pushHref}
          borderRadius="50px"
          fontSize="18px"
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
      </PuckSpinner>
    </IconContext.Provider>
  );
};

export default Home;
