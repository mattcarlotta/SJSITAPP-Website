import { combineReducers } from "redux";
import authReducer from "./Auth";
import serverReducer from "./Server";
import sidemenuReducer from "./Sidemenu";

const reducers = {
  auth: authReducer,
  server: serverReducer,
  sidemenu: sidemenuReducer
};

const RootReducer = combineReducers(reducers);

export type TRootState = ReturnType<typeof RootReducer>;

export default RootReducer;
