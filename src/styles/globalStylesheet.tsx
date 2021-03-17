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
        width: 100%;
        margin: 0;
        padding: 0;
      }

      body {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #025f6d;
        background: #ebebeb;
        font-size: 16px;
        overflow: auto !important;
        padding: 0 !important;
      }

      .Toastify__toast--info {
        background: #0076ff;
      }

      .Toastify__toast--error {
        background: #ed1700;
      }

      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes loading {
        0% {
          opacity: 1;
          letter-spacing: 2px;
        }
        100% {
          opacity: 0.5;
          letter-spacing: auto;
        }
      }

      @keyframes delay {
        0%,
        40%,
        100% {
          transform: scaleY(0.05);
        }

        20% {
          transform: scaleY(1);
        }
      }

      @keyframes fade-in {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes pulse {
        0% {
          background-color: #eee;
        }
        50% {
          background-color: #e4e4e4;
        }
        100% {
          background-color: #eee;
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

      @keyframes wave {
        0% {
          left: -60%;
        }
        100% {
          left: 125%;
        }
      }

      ::-moz-focus-inner {
        border: 0;
      }

      ::-webkit-scrollbar {
        display: none;
      }

      *,
      :after,
      :before {
        -ms-overflow-style: none;
        scrollbar-width: none;
        font-family: "Karla", -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStylesheet;
