import Document, { Html, Head, Main, NextScript } from "next/document";
import { version } from "~root/package.json";

class CustomDocument extends Document {
  render = (): JSX.Element => (
    <Html lang="en">
      <Head>
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:site_name"
          content="Official website for the Sharks Ice Team."
        />
        <meta
          name="description"
          content="Official website for the Sharks Ice Team."
        />
        <link rel="apple-touch-icon" sizes="192x192" href="/logo_192x192.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/ITLogo_192x192.png"
        />
        <link
          rel="preload"
          href="/fonts/Poppins-Light.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="build version" content={version} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default CustomDocument;
