import "react-redux";

import { TRootState } from "../reducers";

declare module "react-redux" {
  /* eslint-disable-next-line */
  interface DefaultRootState extends TRootState {}
}
