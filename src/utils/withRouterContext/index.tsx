import * as React from "react";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { mount } from "enzyme";

/**
 * Factory function to create a mounted RouterContext wrapper for a React component
 *
 * @function withRouterContext
 * @param {node} Component - Component to be mounted
 * @param {object} state - Component initial state for setup.
 * @param {object} router - Initial route options for RouterContext.
 * @param {object} options - Optional options for enzyme's mount function.
 * @function createElement - Creates a wrapper around passed in component with incoming props (now we can use wrapper.setProps on root)
 * @returns {ReactWrapper} - a mounted React component with Router context.
 */
export const withRouterContext = (
  Component: React.ReactElement<any>,
  state: any,
  router = {},
  options = {}
) => {
  const routerOpts = {
    asPath: "/",
    basePath: "",
    back: jest.fn(),
    beforePopState: jest.fn(),
    components: {},
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
    route: "/",
    ...router
  };
  const wrapper = mount(
    React.createElement(props => (
      <RouterContext.Provider value={routerOpts}>
        {React.cloneElement(Component, props)}
      </RouterContext.Provider>
    )),
    options
  );
  if (state) wrapper.find(Component).setState(state);
  return wrapper;
};

export default withRouterContext;
