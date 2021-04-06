import * as React from "react";
import Center from "~components/Layout/Center";
import ErrorMessage from "~components/Layout/ErrorMessage";
import ErrorStatus from "~components/Layout/ErrorStatus";
import Flex from "~components/Layout/Flex";
import HomeIcon from "~components/Layout/HomeIcon";
import PuckSpinner from "~components/Layout/PuckSpinner";
import WhiteBackground from "~components/Layout/WhiteBackground";
import Head from "~components/Navigation/Header";
import Link from "~components/Navigation/Link";
import { NextPage } from "~types";

const NotFound: NextPage = () => (
  <>
    <Head title="Page Not Found" />
    <WhiteBackground>
      <Flex
        data-testid="not-found-page"
        direction="column"
        justify="center"
        height="100vh"
      >
        <PuckSpinner>
          <Center>
            <ErrorStatus>Page Not Found</ErrorStatus>
            <ErrorMessage>
              We&#39;re sorry, the page you&#39;ve requested could not be
              located.
            </ErrorMessage>
            <Link
              dataTestId="go-home-link"
              secondary
              href="/"
              padding="13px 26px"
            >
              <HomeIcon />
              <span>Go Home</span>
            </Link>
          </Center>
        </PuckSpinner>
      </Flex>
    </WhiteBackground>
  </>
);

export default NotFound;
