import { act } from "react-dom/test-utils";

/**
 * A Testing helper function to wait for stacked promises to resolve
 *
 * @function waitFor
 * @param callback - a callback function to invoke after resolving promises
 * @returns promise
 */
const waitFor = (callback: () => void): Promise<any> =>
  act(
    () =>
      new Promise((resolve, reject) => {
        const startTime = Date.now();

        const nextInterval = () => {
          setTimeout(() => {
            try {
              callback();
              resolve();
            } catch (err) {
              if (Date.now() - startTime > 1000) {
                reject(new Error("Timed out."));
              } else {
                nextInterval();
              }
            }
          }, 50);
        };

        nextInterval();
      })
  );

export default waitFor;
