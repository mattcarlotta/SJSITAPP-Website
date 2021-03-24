import { put, call } from "redux-saga/effects";
import { resetMessage, setMessage } from "~actions/Server";
import toast from "~components/App/Toast";
import { SagaIterator } from "~types";

/**
 * Helper function to showcase a success message to the UI.
 *
 * @generator
 * @param {string} message - an API success response message.
 * @yields {action} - A redux action to set app loading state to loaded.
 * @yields {action} - A redux action to set server messages to redux state.
 * @yields {action} - A redux action to reset server messages.
 * @yields {function} - A function to trigger an error toast with the server message.
 */
function* showMessage(message: string): SagaIterator {
  yield put(setMessage(message));
  yield call(toast, { type: "info", message });
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== "test") yield put(resetMessage());
}

export default showMessage;
