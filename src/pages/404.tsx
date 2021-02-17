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

const NotFound: NextPage = () => (
  <BlackBackground>
    <Flex
      data-testid="not-found-page"
      direction="column"
      justify="center"
      style={{ height: "90vh" }}
      id="notfound"
    >
      <Head title="Page Not Found" />
      <img src="/logo_192x192.png" alt="Logo.png" />
      <ErrorTitle>The San Jose Sharks Ice Team</ErrorTitle>
      <Center>
        <ErrorStatus>Page Not Found</ErrorStatus>
        <ErrorMessage>
          We&#39;re sorry, the page you&#39;ve requested could not be located.
        </ErrorMessage>
        <Link href="/" padding="13px 26px">
          <HomeIcon />
          <span>Go Home</span>
        </Link>
      </Center>
    </Flex>
  </BlackBackground>
);

export default NotFound;
