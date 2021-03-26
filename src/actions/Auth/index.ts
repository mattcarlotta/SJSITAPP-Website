import isEmpty from "lodash.isempty";
import * as constants from "~constants";
import {
  TAvatarData,
  TAvatarResData,
  TAuthData,
  TLoginData,
  TNewPasswordData,
  TResetPasswordData,
  TSignupData
} from "~types";

/**
 * Checks for an active session on initial app load.
 *
 * @function checkForActiveSession
 * @returns constants.USER_CHECK_SESSION
 */
export const checkForActiveSession = (): {
  type: typeof constants.USER_CHECK_SESSION;
} => ({
  type: constants.USER_CHECK_SESSION
});

/**
 * Deletes current user avatar.
 *
 * @function deleteUserAvatar
 * @param payload - payload contains is a user's `id`
 * @returns {object}
 */
export const deleteUserAvatar = (
  payload: string
): {
  type: typeof constants.USER_DELETE_AVATAR;
  payload: string;
} => ({
  type: constants.USER_DELETE_AVATAR,
  payload
});

/**
 * Removes user out of current redux session.
 *
 * @function removeSession
 * @returns constants.USER_REMOVE_SESSION
 */
export const removeSession = (): {
  type: typeof constants.USER_REMOVE_SESSION;
} => ({
  type: constants.USER_REMOVE_SESSION
});

/**
 * Creates a user password request via passwordreset form.
 *
 * @function resetPassword
 * @param payload - payload contains an `email` field.
 * @returns constants.USER_PASSWORD_RESET and payload
 */
export const resetPassword = (
  payload: TResetPasswordData
): {
  type: typeof constants.USER_PASSWORD_RESET;
  payload: TResetPasswordData;
} => ({
  type: constants.USER_PASSWORD_RESET,
  payload
});

/**
 * Updates the user avatar to redux state.
 *
 * @function setUserAvatar
 * @param payload - contains an `avatar` url field
 * @returns object
 */
export const setUserAvatar = (
  payload: TAvatarResData
): {
  type: typeof constants.USER_SET_AVATAR;
  payload: TAvatarResData;
} => ({
  type: constants.USER_SET_AVATAR,
  payload
});

/**
 * Sets current signed in user (can be guest) to redux state
 *
 * @function signinSession
 * @param data - contains user session data: `id`, `avatar`, `email`, `firstName`, `lastName`, `registered`, `role`, and `status`.
 * @returns constants.USER_SET_SESSION and data
 */
export const signinSession = (
  data: TAuthData
): {
  type: typeof constants.USER_SET_SESSION;
  payload: TAuthData;
} => ({
  type: constants.USER_SET_SESSION,
  payload: !isEmpty(data) ? data : { role: "guest" }
});

/**
 * Attempts to sign user into a new session via login form.
 *
 * @function signinUser
 * @param payload - contains user's `email` and `password`.
 * @returns constants.USER_SIGNIN_ATTEMPT, email, and password
 */
export const signinUser = (
  payload: TLoginData
): {
  type: typeof constants.USER_SIGNIN_ATTEMPT;
  payload: TLoginData;
} => ({
  type: constants.USER_SIGNIN_ATTEMPT,
  payload
});

/**
 * Attempts to signs user out of current session.
 *
 * @function signoutUser
 * @returns constants.USER_SIGNOUT_SESSION
 */
export const signoutUserSession = (): {
  type: typeof constants.USER_SIGNOUT_SESSION;
} => ({
  type: constants.USER_SIGNOUT_SESSION
});

/**
 * Sign up user via signup form.
 *
 * @function signupUser
 * @param payload - contains a `token`, an `email`, `firstName`, `lastName`, and a `password`.
 * @returns constants.USER_SIGNUP, payload
 */
export const signupUser = (
  payload: TSignupData
): {
  type: typeof constants.USER_SIGNUP;
  payload: TSignupData;
} => ({
  type: constants.USER_SIGNUP,
  payload
});

/**
 * Updates current signed in user avatar.
 *
 * @function updateUserAvatar
 * @param payload - contains `form` formData with user image upload and user `id`
 * @returns constants.USER_UPDATE_AVATAR and payload
 */
export const updateUserAvatar = (
  payload: TAvatarData
): {
  type: typeof constants.USER_UPDATE_AVATAR;
  payload: TAvatarData;
} => ({
  type: constants.USER_UPDATE_AVATAR,
  payload
});

/**
 * Updates user password via newpassword form.
 *
 * @function updateUserPassword
 * @param payload - contains a `token` and `password`.
 * @returns  constants.USER_PASSWORD_UPDATE and payload
 */
export const updateUserPassword = (
  payload: TNewPasswordData
): {
  type: typeof constants.USER_PASSWORD_UPDATE;
  payload: TNewPasswordData;
} => ({
  type: constants.USER_PASSWORD_UPDATE,
  payload
});

/**
 * Updates current signed in user details.
 *
 * @function updateUserProfile
 * @param payload - contains user session data: `id`, `avatar`, `email`, `firstName`, `lastName`, and `role`
 * @returns constants.USER_UPDATE_PROFILE and payload
 */
export const updateUserProfile = (
  payload: TAuthData
): {
  type: typeof constants.USER_UPDATE_PROFILE;
  payload: TAuthData;
} => ({
  type: constants.USER_UPDATE_PROFILE,
  payload
});

/**
 * Updates current signed in session details.
 *
 * @function updateUserSession
 * @param payload - contains user session data: `id`, `avatar`, `email`, `firstName`, `lastName`, and `role`
 * @returns constants.USER_UPDATE_SESSION and payload
 */
export const updateUserSession = (
  payload: TAuthData
): {
  type: typeof constants.USER_UPDATE_SESSION;
  payload: TAuthData;
} => ({
  type: constants.USER_UPDATE_SESSION,
  payload
});
