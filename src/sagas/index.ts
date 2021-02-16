import { all, call } from "redux-saga/effects";
import authSagas from "./Auth";
import { SagaIterator } from "~types";

function* rootSaga(): SagaIterator {
  yield all([call(authSagas)]);
}

export default rootSaga;
