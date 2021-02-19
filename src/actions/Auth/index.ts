import isEmpty from "lodash.isempty";
import * as constants from "~constants";
import {
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
 * @param {string} id - current user id or requested id
 * @returns {object}
 */
// export const deleteUserAvatar = (id: string) => ({
// 	type: constants.USER_DELETE_AVATAR,
// 	id,
// });

/**
 * Removes user out of current redux session.
 *
 * @function removeSession
 * @param (none)
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
 * @param props - props just contain an `email` field.
 * @returns constants.USER_PASSWORD_RESET and props
 */
export const resetPassword = (
  props: TResetPasswordData
): {
  type: typeof constants.USER_PASSWORD_RESET;
  props: TResetPasswordData;
} => ({
  type: constants.USER_PASSWORD_RESET,
  props
});

/**
 * Persists sidebar state.
 *
 * @function setSidebarState
 * @param {object} props - props just contain an email field.
 * @returns constants.USER_SET_SIDEBAR_STATE
 */
// export const setSidebarState = () => ({
// 	type: constants.USER_SET_SIDEBAR_STATE,
// });

/**
 * Updates the user avatar to redux state.
 *
 * @function setUserAvatar
 * @param avatar
 * @returns object
 */
// export const setUserAvatar = avatar => ({
// 	type: constants.USER_SET_AVATAR,
// 	payload: avatar,
// });

/**
 * Sets current signed in user (can be guest) to redux state
 *
 * @function signinSession
 * @param data - contains user session data: `id`, `email`, `firstName`, `lastName`, and `role`.
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
 * @param props - contains user's `email` and `password`.
 * @returns constants.USER_SIGNIN_ATTEMPT, email, and password
 */
export const signinUser = (
  props: TLoginData
): {
  type: typeof constants.USER_SIGNIN_ATTEMPT;
  props: TLoginData;
} => ({
  type: constants.USER_SIGNIN_ATTEMPT,
  props
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
 * @param props - contains a `token`, an `email`, `firstName`, `lastName`, and a `password`.
 * @returns constants.USER_SIGNUP, props
 */
export const signupUser = (
  props: TSignupData
): {
  type: typeof constants.USER_SIGNUP;
  props: TSignupData;
} => ({
  type: constants.USER_SIGNUP,
  props
});

/**
 * Updates current signed in user first and last name.
 *
 * @function updateUser
 * @param {object} data - contains user session data: `id`, `avatar`, `email`, `firstName`, `lastName`, and `role`
 * @returns constants.USER_UPDATE and data
 */
// export const updateUser = data => ({
// 	type: constants.USER_UPDATE,
// 	payload: data,
// });

/**
 * Updates current signed in user avatar.
 *
 * @function updateUserAvatar
 * @param form - contains formData with user image upload
 * @param id - contains user `id`
 * @returns constants.USER_UPDATE_AVATAR, form, id
 */
// export const updateUserAvatar = ({ form, id }) => ({
// 	type: constants.USER_UPDATE_AVATAR,
// 	form,
// 	id,
// });

/**
 * Updates user password via newpassword form.
 *
 * @function updateUserPassword
 * @param props - contains a `token` and `password`.
 * @returns  constants.USER_PASSWORD_UPDATE and props
 */
export const updateUserPassword = (
  props: TNewPasswordData
): {
  type: typeof constants.USER_PASSWORD_UPDATE;
  props: TNewPasswordData;
} => ({
  type: constants.USER_PASSWORD_UPDATE,
  props
});
