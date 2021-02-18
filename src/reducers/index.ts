import { combineReducers } from "redux";
import authReducer from "./Auth";
import serverReducer from "./Server";

const reducers = {
  auth: authReducer,
  server: serverReducer
};

const RootReducer = combineReducers(reducers);

export type TRootState = ReturnType<typeof RootReducer>;

export default RootReducer;
