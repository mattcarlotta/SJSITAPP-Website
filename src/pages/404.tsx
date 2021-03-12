import * as React from "react";
import BlackBackground from "~components/Layout/BlackBackground";
import ErrorMessage from "~components/Layout/ErrorMessage";
import ErrorStatus from "~components/Layout/ErrorStatus";
import HomeIcon from "~components/Layout/HomeIcon";
import Flex from "~components/Layout/Flex";
import Head from "~components/Navigation/Header";
import Link from "~components/Navigation/Link";
import Spinner from "~components/Layout/Spinner";
import { NextPage } from "~types";

const NotFound: NextPage = () => (
  <>
    <Head title="Page Not Found" />
    <BlackBackground>
      <Flex
        data-testid="not-found-page"
        direction="column"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Spinner>
          <ErrorStatus>Page Not Found</ErrorStatus>
          <ErrorMessage>
            We&#39;re sorry, the page you&#39;ve requested could not be located.
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

export default NotFound;
