import Head from "next/head";
import { HeaderProps } from "~types";

const { CLIENT } = process.env;

const Header = ({
  description,
  title,
  type,
  url
}: HeaderProps): JSX.Element => (
  <Head>
    <title>{title} - San Jose Sharks Ice Team</title>
    <link rel="canonical" href={`${CLIENT}${url}`} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={`${CLIENT}${url}`} />
    <meta property="og:type" content={type} />
  </Head>
);

Header.defaultProps = {
  description: "Official website for the Sharks Ice Team.",
  type: "website"
};

export default Header;
