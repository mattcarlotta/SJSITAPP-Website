import Router, { NextRouter } from "next/router";

const mockRouterOpts: NextRouter = {
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
  isPreview: false,
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

export const useRouter = (): NextRouter => mockRouterOpts;

jest.mock("next/router", () => ({
  __esModule: true,
  makePublicRouterInstance: jest.fn(),
  useRouter: () => mockRouterOpts,
  default: {
    router: null,
    readyCallbacks: jest.fn(),
    ready: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    withRouter: jest.fn(),
    createRouter: jest.fn(),
    Router: {
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn()
      }
    }
  }
}));

export default Router;
