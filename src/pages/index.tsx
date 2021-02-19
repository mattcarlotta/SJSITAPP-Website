import * as React from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { FaSignInAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { MdDashboard } from "react-icons/md";
import Button from "~components/Layout/Button";
import Spinner from "~components/Layout/Spinner";
import Submitting from "~components/Layout/Submitting";
import Header from "~components/Navigation/Header";
import { NextPage } from "~types";

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
      <Spinner>
        <Button
          tertiary
          uppercase
          disabled={!role}
          type="button"
          marginRight="0px"
          width="260px"
          style={{ margin: "20px auto 0" }}
          onClick={() =>
            Router.push(hasSession ? "/employee/dashboard" : "/employee/login")
          }
        >
          {!role ? (
            <Submitting style={{ height: "25px" }} />
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
        </Button>
      </Spinner>
    </IconContext.Provider>
  );
};

export default Home;
