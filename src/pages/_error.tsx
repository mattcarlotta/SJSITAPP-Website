import Center from "~components/Layout/Center";
import ErrorMessage from "~components/Layout/ErrorMessage";
import ErrorStatus from "~components/Layout/ErrorStatus";
import ErrorTitle from "~components/Layout/ErrorTitle";
import Flex from "~components/Layout/Flex";
import HomeIcon from "~components/Layout/HomeIcon";
import PuckSpinner from "~components/Layout/PuckSpinner";
import WhiteBackground from "~components/Layout/WhiteBackground";
import Head from "~components/Navigation/Header";
import Link from "~components/Navigation/Link";
import { FaHeartBroken } from "~icons";
import { NextPage } from "~types";

const ServerError: NextPage = () => (
  <main>
    <Head title="Server Error" />
    <WhiteBackground>
      <Flex
        data-testid="server-error-page"
        direction="column"
        justify="center"
        height="90vh"
      >
        <PuckSpinner>
          <Center>
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
            <Link
              dataTestId="go-home-link"
              secondary
              href="/"
              margin="0 auto"
              padding="13px 26px"
            >
              <HomeIcon />
              <span>Go Home</span>
            </Link>
          </Center>
        </PuckSpinner>
      </Flex>
    </WhiteBackground>
  </main>
);

export default ServerError;
