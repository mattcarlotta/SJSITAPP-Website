import * as React from "react";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { NextRouter } from "next/router";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { makeStore } from "~store";

export const store = makeStore({});

/* istanbul ignore next */
export const mockRouter: NextRouter = {
  asPath: "/",
  basePath: "",
  back: jest.fn(() => Promise.resolve(true)),
  beforePopState: jest.fn(() => Promise.resolve(true)),
  defaultLocale: undefined,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
  locale: undefined,
  locales: undefined,
  pathname: "/",
  prefetch: jest.fn(() => Promise.resolve()),
  push: jest.fn(() => Promise.resolve(true)),
  query: {},
  reload: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  route: "/"
};

/**
 * Factory function to create a mounted RouterContext wrapper for a React component
 *
 * @function withProviders
 * @param {node} Component - Component to be mounted
 * @param {object} router - Initial route options for RouterContext.
 * @param {object} options - Optional options for enzyme's mount function.
 * @function createElement - Creates a wrapper around passed in component with incoming props (now we can use wrapper.setProps on root)
 * @returns {ReactWrapper} - a mounted React component with Router context.
 */
export const withProviders = (
  Component: React.ReactElement<any>,
  routerOpts = {},
  options = {}
): ReactWrapper =>
  mount(
    React.createElement(props => (
      <Provider store={store}>
        <RouterContext.Provider value={{ ...mockRouter, ...routerOpts }}>
          {React.cloneElement(Component, props)}
        </RouterContext.Provider>
      </Provider>
    )),
    options
  );

export default withProviders;
