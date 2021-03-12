import * as React from "react";
import BlackBackground from "~components/Layout/BlackBackground";
import ErrorMessage from "~components/Layout/ErrorMessage";
import ErrorStatus from "~components/Layout/ErrorStatus";
import ErrorTitle from "~components/Layout/ErrorTitle";
import HomeIcon from "~components/Layout/HomeIcon";
import Spinner from "~components/Layout/Spinner";
import Flex from "~components/Layout/Flex";
import Head from "~components/Navigation/Header";
import Link from "~components/Navigation/Link";
import { FaHeartBroken } from "~icons";
import { NextPage } from "~types";

const ServerError: NextPage = () => (
  <>
    <Head title="Server Error" />
    <BlackBackground>
      <Flex
        data-testid="server-error-page"
        direction="column"
        justify="center"
        style={{ height: "90vh" }}
      >
        <Spinner>
          <ErrorTitle>The Sharks Ice Team</ErrorTitle>
          <ErrorStatus>
            <FaHeartBroken style={{ position: "relative", top: 8 }} /> 500
          </ErrorStatus>
          <ErrorMessage style={{ marginBottom: 5 }}>
            Uh Oh! The server has encountered an error.
          </ErrorMessage>
          <ErrorMessage>
            Please wait a few moments before reloading the page.
          </ErrorMessage>
          <Link dataTestId="go-home-link" href="/" padding="13px 26px">
            <HomeIcon />
            <span>Go Home</span>
          </Link>
        </Spinner>
      </Flex>
    </BlackBackground>
  </>
);

export default ServerError;
