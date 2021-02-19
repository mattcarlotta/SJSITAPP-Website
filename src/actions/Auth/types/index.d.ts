import * as constants from "~constants";
import {
  TAuthData,
  TLoginData,
  TNewPasswordData,
  TResetPasswordData,
  TSignupData
} from "~types";

export interface ICheckForSessionAction {
  (): { type: typeof constants.USER_CHECK_SESSION };
}

export interface IRemoveSessionAction {
  (): { type: typeof constants.USER_REMOVE_SESSION };
}

export interface IResetPasswordAction {
  (props: TResetPasswordData): {
    type: typeof constants.USER_PASSWORD_RESET;
    props: TResetPasswordData;
  };
}

export interface ISigninSessionAction {
  (data: TAuthData): {
    type: typeof constants.USER_SET_SESSION;
    payload: TAuthData;
  };
}

export interface ISigninAttemptAction {
  (props: TLoginData): {
    type: typeof constants.USER_SIGNIN_ATTEMPT;
    props: TLoginData;
  };
}

export interface ISignoutUserSessionAction {
  (): { type: typeof constants.USER_SIGNOUT_SESSION };
}

export interface ISignupAction {
  (props: TSignupData): {
    type: typeof constants.USER_SIGNUP;
    props: TSignupData;
  };
}

export interface IUpdateUserPasswordAction {
  (props: TNewPasswordData): {
    type: typeof constants.USER_PASSWORD_UPDATE;
    props: TNewPasswordData;
  };
}
