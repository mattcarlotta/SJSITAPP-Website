import * as React from "react";
import { useSelector } from "react-redux";
import Link from "~components/Navigation/Link";
import Submitting from "~components/Layout/Submitting";
import Header from "~components/Navigation/Header";
import { IconContext, FaSignInAlt, MdDashboard } from "~icons";
import { NextPage } from "~types";
import PuckSpinner from "~components/Layout/PuckSpinner";

const Home: NextPage = () => {
  const { role } = useSelector(({ auth }) => auth);
  const hasSession = role !== "guest";

  return (
    <IconContext.Provider
      value={{
        style: { position: "relative", top: 3, marginRight: 8, fontSize: 20 }
      }}
    >
      <Header title="Home" url="/" />
      <PuckSpinner>
        <Link
          secondary
          display="block"
          dataTestId="home-link"
          href={hasSession ? "/employee/dashboard" : "/employee/login"}
          borderRadius="50px"
          fontSize="18px"
          padding="13px 18px"
          width="260px"
        >
          {!role ? (
            <Submitting
              style={{ height: "25px", background: "#025f6d", border: 0 }}
            />
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
