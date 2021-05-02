/* istanbul ignore file */
import * as React from "react";
import throttle from "lodash.throttle";

const useWindowSize = (): number => {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  React.useLayoutEffect(() => {
    const setWindowHeight = throttle((): void => {
      setWindowSize(window.innerWidth);
    }, 300);

    window.addEventListener("resize", setWindowHeight);
    return () => {
      window.removeEventListener("resize", setWindowHeight);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
