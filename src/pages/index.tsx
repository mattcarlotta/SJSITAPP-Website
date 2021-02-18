import * as React from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { FaSignInAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { MdDashboard } from "react-icons/md";
import Submitting from "~components/Layout/Submitting";
import Button from "~components/Layout/Button";
import Spinner from "~components/Layout/Spinner";
import Header from "~components/Navigation/Header";
import { NextPage } from "~types";

const Home: NextPage = () => {
  const { role } = useSelector(({ auth }) => ({
    role: auth.role
  }));

  const isLoggedin = role !== "guest";

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
          type="button"
          marginRight="0px"
          width="260px"
          style={{ margin: "20px auto 0", fontWeight: 400 }}
          onClick={() =>
            Router.push(isLoggedin ? "/employee/dashboard" : "/employee/login")
          }
        >
          {!role ? (
            <Submitting style={{ height: "25px" }} />
          ) : isLoggedin ? (
            <span>
              <MdDashboard />
              View Dashboard
            </span>
          ) : (
            <span>
              <FaSignInAlt />
              Employee Login
            </span>
          )}
        </Button>
      </Spinner>
    </IconContext.Provider>
  );
};

export default Home;
