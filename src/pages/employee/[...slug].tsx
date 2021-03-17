import * as React from "react";
import Card from "~components/Layout/Card";
import Center from "~components/Layout/Center";
import ErrorMessage from "~components/Layout/ErrorMessage";
import ErrorStatus from "~components/Layout/ErrorStatus";
import Flex from "~components/Layout/Flex";
import HomeIcon from "~components/Layout/HomeIcon";
import Margin from "~components/Layout/Margin";
import Head from "~components/Navigation/Header";
import Link from "~components/Navigation/Link";
import requiresBasicCredentials from "~containers/App/requiresBasicCredentials";
import { BsEyeSlashFill } from "~icons";
import { NextPage } from "~types";

const AppPageNotFound: NextPage = () => (
  <Card
    dataTestId="app-page-not-found"
    title="Page Not Found"
    icon={<BsEyeSlashFill />}
    subtitle="Uh oh. You took a wrong turn!"
  >
    <Flex
      data-testid="not-found-page"
      direction="column"
      justify="center"
      style={{ height: "calc(100vh - 200px)" }}
    >
      <Head title="Page Not Found" />
      <Center>
        <Margin as="div" bottom="-30px">
          <img src="/logo_192x192.png" alt="logo" />
        </Margin>
        <ErrorStatus>Page Not Found</ErrorStatus>
        <ErrorMessage>
          We&#39;re sorry, the page you&#39;ve requested could not be located.
        </ErrorMessage>
        <Link
          secondary
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
  </Card>
);

export default requiresBasicCredentials(AppPageNotFound);
