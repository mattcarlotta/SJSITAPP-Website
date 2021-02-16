import "react-redux";

import { RootState } from "../reducers";

declare module "react-redux" {
  /* eslint-disable-next-line */
  interface DefaultRootState extends RootState {}
}
