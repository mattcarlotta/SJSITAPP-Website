/* istanbul ignore file */
import * as React from "react";
import throttle from "lodash.debounce";

const useWindowSize = (): number => {
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  const setWindowHeight = React.useCallback(
    throttle((): void => {
      setWindowSize(window.innerWidth);
    }, 300),
    []
  );

  React.useLayoutEffect(() => {
    window.addEventListener("resize", setWindowHeight);
    return () => {
      window.removeEventListener("resize", setWindowHeight);
    };
  }, [setWindowHeight]);

  return windowSize;
};

export default useWindowSize;
