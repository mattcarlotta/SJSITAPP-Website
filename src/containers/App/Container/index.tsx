import * as React from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { checkForActiveSession } from "~actions/Auth";
import GlobalStylesheet from "~styles/globalStylesheet";
import { AppProps } from "~types";

const Container = ({ Component, pageProps }: AppProps): JSX.Element => {
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
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Component {...pageProps} />
      </MuiPickersUtilsProvider>
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

export default Container;
