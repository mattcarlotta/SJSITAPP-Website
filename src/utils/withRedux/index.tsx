import * as React from "react";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { makeStore } from "~store";

export const store = makeStore({});

/**
 * Factory function to create a mounted RouterContext wrapper for a React component
 *
 * @function withReduxContext
 * @param {node} Component - Component to be mounted
 * @param {object} options - Optional options for enzyme's mount function.
 * @function createElement - Creates a wrapper around passed in component with incoming props (now we can use wrapper.setProps on root)
 * @returns {ReactWrapper} - a mounted React component with Router context.
 */
export const withReduxContext = (
  Component: React.ReactElement<any>,
  options = {}
): ReactWrapper =>
  mount(
    React.createElement(props => (
      <Provider store={store}>{React.cloneElement(Component, props)}</Provider>
    )),
    options
  );

export default withReduxContext;
