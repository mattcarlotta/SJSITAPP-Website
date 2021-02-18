import * as React from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { checkForActiveSession } from "~actions/Auth";
import { wrapper } from "~store";
import GlobalStylesheet from "~styles/globalStylesheet";
import { AppProps, FC } from "~types";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkForActiveSession());

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Component {...pageProps} />
      <GlobalStylesheet />
      <ToastContainer
        position="top-right"
        autoClose={7500}
        hideProgressBar={false}
        newestOnTop={false}
        draggable
        pauseOnHover
      />
    </>
  );
};

export default wrapper.withRedux(App);
