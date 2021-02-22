import Router from "next/router";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: {
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
    route: "/"
  },
  makePublicRouterInstance: jest.fn(),
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
