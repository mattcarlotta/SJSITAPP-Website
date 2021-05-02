import Router from "next/router";
import { all, put, call, takeLatest } from "redux-saga/effects";
import toast from "~components/App/Toast";
import * as actions from "~actions/Auth";
import { resetSideMenu } from "~actions/Sidemenu";
import * as constants from "~constants";
import app, { avatarAPI } from "~utils/axiosConfig";
import { parseData, parseMessage } from "~utils/parseResponse";
import showError from "~utils/showError";
import showMessage from "~utils/showMessage";
import type {
  TDeleteUserAvatar,
  TResetPassword,
  TSigninUser,
  TSignupUser,
  TUpdateUserAvatar,
  TUpdateUserPassword,
  TUpdateUserProfile
} from "~actions/Auth";
import { AxiosResponse, SagaIterator, TAuthData } from "~types";

/**
 * Checks if the current user has a cookie session.
 *
 * @generator
 * @function checkForUserSession
 * @yield {AxiosResponse} - A response from a call to the API.
 * @yield {TAuthData} - Returns parsed `res.data`.
 * @yields {AnyAction} - A redux action to set the current user to redux state.
 * @throws {AnyAction} - A redux action to display a server error.
 */
export function* checkForActiveSession(): SagaIterator {
  try {
    const res: AxiosResponse = yield call(app.get, "signedin");
    const data: TAuthData = yield call(parseData, res);

    yield put(actions.signinSession(data));
  } catch (e) {
    yield put(actions.signinSession({ role: "guest" }));
    yield call(showError, e.toString());
  }
}

/**
 * Removes the current user from a express and redux session.
 *
 * @generator
 * @function signoutUserSession
 * @yield {AxiosResponse} - A response from a call to the API.
 * @yields {AnyAction} A redux action to push to a URL.
 * @yield {AnyAction} A redux action to remove the current user from state.
 * @throws {AnyAction} - A redux action to display a server error.
 */
export function* signoutUserSession(): SagaIterator {
  try {
    yield call(app.get, "signout");

    yield call(Router.push, "/employee/login");

    yield put(actions.removeSession());
    yield put(resetSideMenu());
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to delete a user avatar.
 *
 * @generator
 * @function deleteUserAvatar
 * @param payload - contains user `id`.
 * @yield {AxiosResponse} - A response from a call to the API.
 * @yield {string} - Returns parsed `res.message`.
 * @yield {AnyAction} - A redux action to display a toast message by type.
 * @yield {AnyAction} - A redux action to reset users avatar url.
 * @throws {AnyAction} - A redux action to display a server error.
 */
export function* deleteUserAvatar({
  payload
}: ReturnType<TDeleteUserAvatar>): SagaIterator {
  try {
    const res: AxiosResponse = yield call(
      avatarAPI.delete,
      `delete/${payload}`
    );
    const message: string = yield call(parseMessage, res);

    yield call(toast, { type: "info", message });

    yield put(actions.setUserAvatar({ avatar: "" }));
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to create a reset password request.
 *
 * @generator
 * @function resetPassword
 * @param payload - payload just contain an `email` field.
 * @yield {AnyAction} - A redux action to reset server messages.
 * @yield {AxiosResponse} - A response from a call to the API.
 * @yield {string} - Returns parsed `res.message`.
 * @yield A toast message by type.
 * @yields {SagaIterator} - A saga to sign the user out of any sessions.
 * @throws {AnyAction} - A redux action to display a server error.
 */
export function* resetPassword({
  payload
}: ReturnType<TResetPassword>): SagaIterator {
  try {
    const res: AxiosResponse = yield call(app.put, "reset-password", payload);
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
 * @param payload - contains user credentials `email` and `password` fields.
 * @yield {AnyAction} - A redux action to reset server messages.
 * @yield {AxiosResponse} - A response from a call to the API.
 * @yield {TAuthData} - Returns parsed `res.data`.
 * @yield {AnyAction} -  A redux action to set the current user to redux state.
 * @yields {AnyAction} - A router replace event to /employee/dashboard.
 * @throws {AnyAction} - A redux action to display a server error.
 */
export function* signinUser({
  payload
}: ReturnType<TSigninUser>): SagaIterator {
  try {
    const res: AxiosResponse = yield call(app.post, "signin", payload);
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
 * @param payload - payload contain a `token`, an `email`, `firstName`, `lastName`, and a `password`.
 * @yield {AxiosResponse} - A response from a call to the API.
 * @yield {string} - Returns parsed `res.message`.
 * @yield {AnyAction} - A toast message by type.
 * @yields {AnyAction} - A router push event to /employee/login.
 * @throws {AnyAction} - A redux action to display a server error.
 */
export function* signupUser({
  payload
}: ReturnType<TSignupUser>): SagaIterator {
  try {
    const res: AxiosResponse = yield call(app.post, "signup", payload);
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
 * @param payload - `form` is formData image and `id` is user id.
 * @yield {AxiosResponse} - A response from a call to the API.
 * @yield {object} - returns a parsed res.data of `avatar` as string and `message` as string.
 * @yield {AnyAction} - A redux action to display a server success message.
 * @yield {AnyAction} - A redux action do set user avatar to redux state.
 * @throws {AnyAction} - A redux action to display a server error.
 */
export function* updateUserAvatar({
  payload
}: ReturnType<TUpdateUserAvatar>): SagaIterator {
  try {
    const res: AxiosResponse = yield call(
      avatarAPI.put,
      `update/${payload.id}`,
      payload.form
    );

    const data: { avatar: string; message: string } = yield call(
      parseData,
      res
    );

    const { avatar, message } = data;

    yield call(showMessage, message);

    yield put(actions.setUserAvatar({ avatar }));
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to create a new user password.
 *
 * @generator
 * @function updateUserPassword
 * @param payload - contains a `token` and (new) `password` fields.
 * @yield {AxiosResponse} - A response from a call to the API.
 * @yield {string} - Returns parsed `res.message`.
 * @yield {AnyAction} - A toast message by type.
 * @yields {SagaIterator} - A saga to sign the user out of any sessions.
 * @throws {AnyAction} - A redux action to display a server error.
 */
export function* updateUserPassword({
  payload
}: ReturnType<TUpdateUserPassword>): SagaIterator {
  try {
    const res: AxiosResponse = yield call(app.put, "new-password", payload);
    const message: string = yield call(parseMessage, res);

    yield call(toast, { type: "success", message });

    yield call(signoutUserSession);
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Attempts to update a user profile.
 *
 * @generator
 * @function updateUserProfile
 * @param payload - An object that contains `emailReminders`, `email`, `firstName` and `lastName`.
 * @yield {AxiosResponse} - A response from a call to the API.
 * @yield {object} - returns a parsed res.data of `message` as string and `user` with updated payload properties.
 * @yield {AnyAction} - A redux action to set a server message by type.
 * @yield {AnyAction} - A redux action to display a toast message by type.
 * @yield {SagaIterator} - A saga action to remove user current session.
 * @yields {AnyAction} - A redux action to update settings with `user` data.
 * @throws {AnyAction} - A redux action to display a server error.
 */
export function* updateUserProfile({
  payload
}: ReturnType<TUpdateUserProfile>): SagaIterator {
  try {
    const res: AxiosResponse = yield call(
      app.put,
      "member/settings/update",
      payload
    );
    const data: { message: string; user: TAuthData } = yield call(
      parseData,
      res
    );

    const { message, user } = data;

    yield call(showMessage, message);

    if (message !== "Successfully updated your settings.") {
      yield call(signoutUserSession);
    } else {
      yield put(actions.updateUserSession(user));
    }
  } catch (e) {
    yield call(showError, e.toString());
  }
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function authSagas
 * @yield {watchers}
 */
export default function* authSagas(): SagaIterator {
  yield all([
    takeLatest(constants.USER_CHECK_SESSION, checkForActiveSession),
    takeLatest(constants.USER_DELETE_AVATAR, deleteUserAvatar),
    takeLatest(constants.USER_PASSWORD_RESET, resetPassword),
    takeLatest(constants.USER_SIGNIN_ATTEMPT, signinUser),
    takeLatest(constants.USER_SIGNOUT_SESSION, signoutUserSession),
    takeLatest(constants.USER_SIGNUP, signupUser),
    takeLatest(constants.USER_UPDATE_PROFILE, updateUserProfile),
    takeLatest(constants.USER_UPDATE_AVATAR, updateUserAvatar),
    takeLatest(constants.USER_PASSWORD_UPDATE, updateUserPassword)
  ]);
}
