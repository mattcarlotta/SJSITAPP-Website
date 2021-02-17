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
  const { role, isLoading } = useSelector(({ app, auth }) => ({
    role: auth.role,
    isLoading: app.isLoading
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
          type="button"
          marginRight="0px"
          width="175px"
          style={{ margin: "20px auto 0" }}
          onClick={() =>
            Router.push(isLoggedin ? "/employee/dashboard" : "/employee/login")
          }
        >
          {isLoading ? (
            <Submitting style={{ height: "25px" }} />
          ) : isLoggedin ? (
            <span>
              <MdDashboard />
              Dashboard
            </span>
          ) : (
            <span>
              <FaSignInAlt />
              Login
            </span>
          )}
        </Button>
      </Spinner>
    </IconContext.Provider>
  );
};

export default Home;
