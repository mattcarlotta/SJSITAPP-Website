import * as React from "react";
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import { version } from "../../package.json";

const imageAPI = process.env.NEXT_PUBLIC_IMAGEAPI;

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ]
    };
  }

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
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href={`${imageAPI}/images/logo_192x192.png`}
        />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href={`${imageAPI}/images/logo_192x192.png`}
        />
        <link rel="icon" href={`${imageAPI}/images/favicon.ico`} />
        <link rel="manifest" href={`${imageAPI}/assets/manifest.json`} />
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
