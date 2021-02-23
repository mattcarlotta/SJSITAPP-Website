import * as React from "react";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { makeStore } from "~store";
import { NextRouter } from "next/router";

export const store = makeStore({});

export const mockRouter: NextRouter = {
  asPath: "/",
  basePath: "",
  back: jest.fn(),
  beforePopState: jest.fn(),
  defaultLocale: undefined,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  locale: undefined,
  locales: undefined,
  pathname: "/",
  prefetch: jest.fn(),
  push: jest.fn(),
  query: {},
  reload: jest.fn(),
  replace: jest.fn(),
  route: "/"
};

/**
 * Factory function to create a mounted RouterContext wrapper for a React component
 *
 * @function withProviders
 * @param {node} Component - Component to be mounted
 * @param {object} state - Component initial state for setup ***ONLY WORKS FOR CLASSES***.
 * @param {object} router - Initial route options for RouterContext.
 * @param {object} options - Optional options for enzyme's mount function.
 * @function createElement - Creates a wrapper around passed in component with incoming props (now we can use wrapper.setProps on root)
 * @returns {ReactWrapper} - a mounted React component with Router context.
 */
export const withProviders = (
  Component: React.ReactElement<any>,
  state?: any,
  routerOpts = {},
  options = {}
) => {
  const wrapper = mount(
    React.createElement(props => (
      <Provider store={store}>
        <RouterContext.Provider value={{ ...mockRouter, ...routerOpts }}>
          {React.cloneElement(Component, props)}
        </RouterContext.Provider>
      </Provider>
    )),
    options
  );
  if (state) wrapper.find(Component).setState(state);
  return wrapper;
};

export default withProviders;
