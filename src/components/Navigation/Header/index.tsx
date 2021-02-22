import Head from "next/head";

export type THeaderProps = {
  description: string;
  title: string;
  type: string;
  url?: string;
};

const Header = ({
  description,
  title,
  type,
  url
}: THeaderProps): JSX.Element => (
  <Head>
    <title>{title} - San Jose Sharks Ice Team</title>
    <link rel="canonical" href={`${process.env.NEXT_PUBLIC_CLIENT}${url}`} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta
      property="og:url"
      content={`${process.env.NEXT_PUBLIC_CLIENT}${url}`}
    />
    <meta property="og:type" content={type} />
  </Head>
);

Header.defaultProps = {
  description: "Official website for the Sharks Ice Team.",
  type: "website"
};

export default Header;
