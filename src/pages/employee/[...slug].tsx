import * as React from "react";
import Center from "~components/Layout/Center";
import ErrorMessage from "~components/Layout/ErrorMessage";
import ErrorStatus from "~components/Layout/ErrorStatus";
import HomeIcon from "~components/Layout/HomeIcon";
import Flex from "~components/Layout/Flex";
import Head from "~components/Navigation/Header";
import Link from "~components/Navigation/Link";
import requiresBasicCredentials from "~containers/App/requiresBasicCredentials";
import { NextPage } from "~types";

const AppPageNotFound: NextPage = () => (
  <Flex
    data-testid="not-found-page"
    direction="column"
    justify="center"
    style={{ height: "80vh" }}
  >
    <Head title="Page Not Found" />
    <Center>
      <ErrorStatus>Page Not Found</ErrorStatus>
      <ErrorMessage>
        We&#39;re sorry, the page you&#39;ve requested could not be located.
      </ErrorMessage>
      <Link
        primary
        replace
        dataTestId="dashboard-link"
        href="/employee/dashboard"
        padding="13px 26px"
      >
        <HomeIcon />
        <span>Dashboard</span>
      </Link>
    </Center>
  </Flex>
);

export default requiresBasicCredentials(AppPageNotFound);
