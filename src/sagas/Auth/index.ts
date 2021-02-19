import Router from "next/router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import toast from "~components/App/Toast";
import * as actions from "~actions/Auth"; // setUserAvatar, signout
// import { fetchMemberSettings } from "~actions/Members";
import { resetMessage } from "~actions/Server"; // setMessage
import * as constants from "~constants";
import app from "~utils/axiosConfig"; // { avatarAPI }
import { parseData, parseMessage } from "~utils/parseResponse";
import showError from "~utils/showError";
import { SagaIterator, TAuthData } from "~types";

/**
 * Checks if the current user has a cookie session.
 *
 * @generator
 * @function checkForUserSession
 * @yields {object} - A response from a call to the API.
 * @yields {object} - Returns parsed res.data.
 * @yields {action} - A redux action to set the current user to redux state.
 * @yields {action} - Navigates user to route.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* checkForActiveSession(): SagaIterator {
  try {
    const res = yield call(app.get, "signedin");
    const data: TAuthData = yield call(parseData, res);

    yield put(actions.signinSession(data));
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Removes the current user from a express and redux session.
 *
 * @generator
 * @function signoutUserSession
 * @yields {object} - A redux action to remove the current user from state.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signoutUserSession(): SagaIterator {
  try {
    yield call(app.get, "signout");

    yield call(Router.push, "/employee/login");

    yield put(actions.removeSession());
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to delete a user avatar.
 *
 * @generator
 * @function deleteUserAvatar
 * @param {object} id - user id.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - A redux action to reset users avatar url.
 * @yields {action} - A redux action to refresh the member's settings.
 * @throws {action} - A redux action to display a server message by type.
 */
// export function* deleteUserAvatar({ id }) {
//   try {
//     yield put(resetMessage());

//     const res = yield call(avatarAPI.delete, `delete/${id}`);
//     const message: string = yield call(parseMessage, res);

//     yield put(
//       setServerMessage({
//         message
//       })
//     );
//     yield call(toast, { type: "info", message });

//     yield put(setUserAvatar({ avatar: "" }));
//     yield put(fetchMemberSettings());
//   } catch (e) {
//      yield call(showError, e.toString());
//   }
// }

/**
 * Attempts to create a reset password request.
 *
 * @generator
 * @function resetPassword
 * @param {object} props - props just contain an email field.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - A redux action to sign the user out of any sessions.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* resetPassword({
  props
}: ReturnType<typeof actions.resetPassword>): SagaIterator {
  try {
    yield put(resetMessage());

    const res = yield call(app.put, "reset-password", { ...props });
    const message: string = yield call(parseMessage, res);

    yield call(toast, { type: "info", message });

    yield call(signoutUserSession);
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to sign user in to a new session.
 *
 * @generator
 * @function signinUser
 * @param {object} props - contains user credentials (email and password).
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} -  A redux action to set the current user to redux state.
 * @yields {action} - Navigates user to route.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signinUser({
  props
}: ReturnType<typeof actions.signinUser>): SagaIterator {
  try {
    yield put(resetMessage());

    const res = yield call(app.post, "signin", { ...props });
    const data: TAuthData = yield call(parseData, res);

    yield put(actions.signinSession(data));

    yield call(Router.replace, "/employee/dashboard");
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to sign up a new user.
 *
 * @generator
 * @function signupUser
 * @param {object} props - props contain a token, an email, first/last name, and a password.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - Navigates user to route.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signupUser({
  props
}: ReturnType<typeof actions.signupUser>): SagaIterator {
  try {
    yield put(resetMessage());

    const res = yield call(app.post, "signup", { ...props });
    const message: string = yield call(parseMessage, res);

    yield call(toast, { type: "success", message });

    yield call(Router.push, "/employee/login");
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to update a user avatar.
 *
 * @generator
 * @function updateUserAvatar
 * @param {object} form - formData contains image.
 * @param {string} id - user's id.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set a server message by type.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - A redux action do set user avatar to redux state.
 * @yields {action} - A redux action to fresh member settings.
 * @throws {action} - A redux action to display a server message by type.
 */
// export function* updateUserAvatar({ form, id }) {
//   try {
//     yield put(resetMessage());

//     const res = yield call(avatarAPI.put, `update/${id}`, form);
//     const data = yield call(parseData, res);

//     const { avatar, message } = data;

//     yield put(
//       setServerMessage({
//         message
//       })
//     );
//     yield call(toast, { type: "info", message });

//     yield put(setUserAvatar({ avatar }));
//     yield put(fetchMemberSettings());
//   } catch (e) {
//      yield call(showError, e.toString());
//   }
// }

/**
 * Attempts to create a new user password.
 *
 * @generator
 * @function updateUserPassword
 * @param {object} props - props contain a token and (new) password fields.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a toast message by type.
 * @yields {action} - A redux action to push to sign the user out of any sessions.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* updateUserPassword({
  props
}: ReturnType<typeof actions.updateUserPassword>): SagaIterator {
  try {
    yield put(resetMessage());

    const res = yield call(app.put, "new-password", { ...props });
    const message: string = yield call(parseMessage, res);

    yield call(toast, { type: "success", message });

    yield call(signoutUserSession);
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function authSagas
 * @yields {watchers}
 */
export default function* authSagas(): SagaIterator {
  yield all([
    takeLatest(constants.USER_CHECK_SESSION, checkForActiveSession),
    // takeLatest(constants.USER_DELETE_AVATAR, deleteUserAvatar),
    takeLatest(constants.USER_PASSWORD_RESET, resetPassword),
    takeLatest(constants.USER_SIGNIN_ATTEMPT, signinUser),
    takeLatest(constants.USER_SIGNOUT_SESSION, signoutUserSession),
    takeLatest(constants.USER_SIGNUP, signupUser),
    // takeLatest(constants.USER_UPDATE_AVATAR, updateUserAvatar),
    takeLatest(constants.USER_PASSWORD_UPDATE, updateUserPassword)
  ]);
}
