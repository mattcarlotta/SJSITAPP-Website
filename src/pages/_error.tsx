import * as React from "react";
import { FaHeartBroken } from "@react-icons/all-files/fa/FaHeartBroken";
import BlackBackground from "~components/Layout/BlackBackground";
import Center from "~components/Layout/Center";
import ErrorMessage from "~components/Layout/ErrorMessage";
import ErrorStatus from "~components/Layout/ErrorStatus";
import ErrorTitle from "~components/Layout/ErrorTitle";
import HomeIcon from "~components/Layout/HomeIcon";
import Flex from "~components/Layout/Flex";
import Head from "~components/Navigation/Header";
import Link from "~components/Navigation/Link";
import { NextPage } from "~types";

const ServerError: NextPage = () => (
  <BlackBackground>
    <Flex
      data-testid="server-error-page"
      direction="column"
      justify="center"
      style={{ height: "90vh" }}
    >
      <Head title="Server Error" />
      <img src="/logo_192x192.png" alt="Logo.png" />
      <ErrorTitle>The San Jose Sharks Ice Team</ErrorTitle>
      <Center>
        <ErrorStatus>
          <FaHeartBroken style={{ position: "relative", top: 8 }} /> 500
        </ErrorStatus>
        <ErrorMessage style={{ marginBottom: 5 }}>
          Uh Oh! The server has encountered an error.
        </ErrorMessage>
        <ErrorMessage>
          Please wait a few moments before reloading the page.
        </ErrorMessage>
        <Link href="/" padding="13px 26px">
          <HomeIcon />
          <span>Go Home</span>
        </Link>
      </Center>
    </Flex>
  </BlackBackground>
);

export default ServerError;
