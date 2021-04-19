import { css, Global } from "@emotion/react";
import { ReactElement } from "~types";

export const GlobalStylesheet = (): ReactElement => (
  <Global
    styles={css`
      @font-face {
        font-family: "Karla";
        font-style: normal;
        font-weight: normal;
        src: url(${process.env.NEXT_PUBLIC_IMAGEAPI}/assets/Karla.ttf)
          format("truetype");
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

      body {
        -ms-overflow-style: none;
        scrollbar-width: none;
        ::-webkit-scrollbar {
          display: none;
        }
      }

      body {
      }

      *,
      :after,
      :before {
        font-family: "Karla", -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStylesheet;
