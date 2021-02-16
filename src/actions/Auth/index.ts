import isEmpty from "lodash.isempty";
import * as constants from "~constants";
import { AuthData } from "~types";

export interface SigninAction {
  type: typeof constants.USER_SIGNIN;
  payload: AuthData;
}

export interface SignoutAction {
  type: typeof constants.USER_SIGNOUT_SESSION;
}

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
 * Creates a user password request via passwordreset form.
 *
 * @function resetPassword
 * @param {object} props - props just contain an email field.
 * @returns {object}
 */
// export const resetPassword = props => ({
// 	type: constants.USER_PASSWORD_RESET,
// 	props,
// });

/**
 * Persists sidebar state.
 *
 * @function setSidebarState
 * @param {object} props - props just contain an email field.
 * @returns {object}
 */
// export const setSidebarState = () => ({
// 	type: constants.USER_SET_SIDEBAR_STATE,
// });

/**
 * Updates the user avatar to redux state.
 *
 * @function setUserAvatar
 * @param {string} avatar
 * @returns {object}
 */
// export const setUserAvatar = avatar => ({
// 	type: constants.USER_SET_AVATAR,
// 	payload: avatar,
// });

/**
 * Sets current signed in user (can be guest) to redux state
 *
 * @function signin
 * @param {object} data - contains user session data (id, email, first/last name, and role).
 * @returns {object}
 */
export const signin = (data: AuthData): SigninAction => ({
  type: constants.USER_SIGNIN,
  payload: !isEmpty(data) ? data : { role: "guest" }
});

/**
 * Attempts to sign user into a new session via login form.
 *
 * @function signinUser
 * @param {object} props - contains user session data (id, email, first/last name, and role).
 * @returns {object}
 */
// export const signinUser = props => ({
//   type: constants.USER_SIGNIN_ATTEMPT,
//   props
// });

/**
 * Attempts to signs user out of current session.
 *
 * @function signoutUser
 * @returns {object}
 */
export const signoutUser = (): SignoutAction => ({
  type: constants.USER_SIGNOUT_SESSION
});

/**
 * Signs user out of current session.
 *
 * @function signout
 * @returns {object}
 */
// export const signout = () => ({
// 	type: constants.USER_SIGNOUT,
// });

/**
 * Sign up user via signup form.
 *
 * @function signupUser
 * @param {object} props - contains a token, an email, first/last name, and a password.
 * @returns {object}
 */
// export const signupUser = props => ({
// 	type: constants.USER_SIGNUP,
// 	props,
// });

/**
 * Updates current signed in user first and last name.
 *
 * @function updateUser
 * @param {object} data - contains user session data first/last name
 * @returns {object}
 */
// export const updateUser = data => ({
// 	type: constants.USER_UPDATE,
// 	payload: data,
// });

/**
 * Updates current signed in user avatar.
 *
 * @function updateUserAvatar
 * @param {object} formData - contains user image upload
 * @param {string} id - contains user id
 * @returns {object}
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
 * @param {object} props - contains a token and new password fields.
 * @returns {object}
 */
// export const updateUserPassword = props => ({
// 	type: constants.USER_PASSWORD_UPDATE,
// 	props,
// });
