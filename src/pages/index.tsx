import * as React from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import Center from "~components/Layout/Center";
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
    <Center
      data-testid="home-page"
      style={{ height: "100%", color: "#0076ff" }}
    >
      <Header title="Home" url="/" />
      <Spinner>
        {!isLoading && (
          <button
            type="button"
            style={{ margin: "20px auto 0", width: "200px" }}
            onClick={() =>
              Router.push(
                isLoggedin ? "/employee/dashboard" : "/employee/login"
              )
            }
          >
            {isLoggedin ? "Go To Dashboard" : "Employee Login"}
          </button>
        )}
      </Spinner>
    </Center>
  );
};

export default Home;
