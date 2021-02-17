import { css, Global } from "@emotion/react";

export const GlobalStylesheet = (): JSX.Element => (
  <Global
    styles={css`
      @font-face {
        font-family: "Karla Regular";
        font-style: normal;
        font-weight: normal;
        src: url("/fonts/Karla-Regular.ttf") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Karla Bold";
        font-style: normal;
        font-weight: normal;
        src: url("/fonts/Karla-Bold.ttf") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Karla Italic";
        font-style: normal;
        font-weight: normal;
        src: url("/fonts/Karla-Italic.ttf") format("truetype");
        font-display: swap;
      }
      @font-face {
        font-family: "Karla Bold Italic";
        font-style: normal;
        font-weight: normal;
        src: url("/fonts/Karla-BoldItalic.ttf") format("truetype");
        font-display: swap;
      }

      #__next,
      #app,
      body,
      html {
        height: 100vh;
        background: #ebebeb;
      }

      html,
      body {
        width: 100%;
        margin: 0;
        padding: 0;
      }

      body {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: "Karla Regular", -apple-system, BlinkMacSystemFont,
          "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans",
          "Droid Sans", "Helvetica Neue", sans-serif !important;
      }

      .Toastify__toast--info {
        background: #0076ff;
      }

      .Toastify__toast--error {
        background: #ed1700;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes pop {
        0% {
          top: 6px;
          height: 46px;
        }

        50%,
        100% {
          top: 19px;
          height: 21px;
        }
      }

      ::-moz-focus-inner {
        border: 0;
      }

      *,
      ::after,
      ::before {
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStylesheet;
