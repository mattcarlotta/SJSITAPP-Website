import { combineReducers } from "redux";
import appReducer from "./App";
import authReducer from "./Auth";
import serverReducer from "./Server";

const reducers = {
  app: appReducer,
  auth: authReducer,
  server: serverReducer
};

const RootReducer = combineReducers(reducers);

export type TRootState = ReturnType<typeof RootReducer>;

export default RootReducer;
