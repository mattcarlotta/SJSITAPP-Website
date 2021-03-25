import Router from "next/router";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as actions from "~actions/Auth";
import * as sagas from "~sagas/Auth";
import { resetSideMenu } from "~actions/Sidemenu";
import toast from "~components/App/Toast";
import authReducer, { initialState } from "~reducers/Auth";
import serverReducer from "~reducers/Server";
import app, { avatarAPI } from "~utils/axiosConfig";
import mockApp, { mockAPI } from "~utils/mockAxios";
import { parseData, parseMessage } from "~utils/parseResponse";
import showMessage from "~utils/showMessage";
import {
  TAuthData,
  TLoginData,
  TNewPasswordData,
  TResetPasswordData,
  TSignupData
} from "~types";

const id = "0123456789";
const password = "password";
const email = "test@example.com";
const firstName = "Beta";
const lastName = "Tester";
const token = "1234567890";

const userSession = {
  id,
  avatar: "",
  email,
  firstName,
  lastName,
  role: "staff"
};

const userSignup = {
  token,
  email,
  firstName,
  lastName,
  password
};

describe("Auth Sagas", () => {
  afterEach(() => {
    mockApp.reset();
  });

  afterAll(() => {
    mockApp.restore();
  });

  describe("Check For User Session", () => {
    it("logical flow matches pattern for signed in user session", () => {
      const res = { data: userSession };

      testSaga(sagas.checkForActiveSession)
        .next()
        .call(app.get, `signedin`)
        .next(res)
        .call(parseData, res)
        .next(res.data)
        .put(actions.signinSession(res.data))
        .next()
        .isDone();
    });

    it("successfully sets user session", async () => {
      mockApp.onGet("signedin").reply(200, userSession);

      return expectSaga(sagas.checkForActiveSession)
        .dispatch(actions.checkForActiveSession())
        .withReducer(authReducer)
        .hasFinalState(userSession)
        .run();
    });

    it("if signedin API call fails, it displays a message", async () => {
      const err = "Unable to find signed in session.";
      mockApp.onGet("signedin").reply(404, { err });

      return expectSaga(sagas.checkForActiveSession)
        .dispatch(actions.checkForActiveSession())
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Remove User Session", () => {
    it("logical flow matches pattern for removing signed in user session", () => {
      testSaga(sagas.signoutUserSession)
        .next()
        .call(app.get, "signout")
        .next()
        .call(Router.push, "/employee/login")
        .next()
        .put(actions.removeSession())
        .next()
        .put(resetSideMenu())
        .next()
        .isDone();
    });

    it("successfully removes the user session", async () => {
      mockApp.onGet("signout").reply(200);

      return expectSaga(sagas.signoutUserSession)
        .dispatch(actions.removeSession())
        .withReducer(authReducer)
        .hasFinalState({
          ...initialState,
          role: "guest"
        })
        .run();
    });

    it("if signout API call fails, it displays a message", async () => {
      const err = "Unable to find signed in session.";
      mockApp.onGet("signout").reply(404, { err });

      return expectSaga(sagas.signoutUserSession)
        .dispatch(actions.removeSession())
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Delete User Avatar", () => {
    let payload: string;
    beforeAll(() => {
      payload = id;
    });

    it("logical flow matches pattern for delete avatar requests", () => {
      const message = "Successfully removed avatar.";
      const res = { data: { message } };

      testSaga(sagas.deleteUserAvatar, actions.deleteUserAvatar(payload))
        .next()
        .call(avatarAPI.delete, `delete/${id}`)
        .next(res)
        .call(parseMessage, res)
        .next(res.data.message)
        .call(toast, { type: "info", message: res.data.message })
        .next()
        .put(actions.setUserAvatar({ avatar: "" }))
        .next()
        .isDone();
    });

    it("successfully deletes an avatar", async () => {
      const message = "Successfully removed avatar.";
      mockAPI.onDelete(`delete/${id}`).reply(200, { message });

      return expectSaga(
        sagas.deleteUserAvatar,
        actions.deleteUserAvatar(payload)
      )
        .withReducer(authReducer)
        .hasFinalState(initialState)
        .run();
    });

    it("if API call fails, it displays a message", async () => {
      const err = "Unable to delete the member avatar.";
      mockAPI.onDelete(`delete/${id}`).reply(404, { err });

      return expectSaga(
        sagas.deleteUserAvatar,
        actions.deleteUserAvatar(payload)
      )
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Reset User Password", () => {
    let payload: TResetPasswordData;
    beforeAll(() => {
      payload = { email: userSession.email };
    });

    it("logical flow matches pattern for a successful password reset request", () => {
      const message = "Successfully changed password.";
      const res = { data: { message } };

      testSaga(sagas.resetPassword, actions.resetPassword(payload))
        .next()
        .call(app.put, "reset-password", payload)
        .next(res)
        .call(parseMessage, res)
        .next(res.data.message)
        .call(toast, { type: "info", message: res.data.message })
        .next()
        .call(sagas.signoutUserSession)
        .next()
        .isDone();
    });

    it("successfully requests a password reset and removes user from session", async () => {
      const message =
        "A password reset email has been sent to test@example.com.";
      mockApp.onPut("reset-password").reply(200, { message });
      mockApp.onGet("signout").reply(200, { message });

      return expectSaga(sagas.resetPassword, actions.resetPassword(payload))
        .dispatch(actions.signinSession(userSession))
        .withReducer(authReducer)
        .hasFinalState({ ...initialState, role: "guest" })
        .run();
    });

    it("if reset-password API call fails, it displays a message", async () => {
      const err = "Unable to automatically sign in";
      mockApp.onPut("reset-password").reply(404, { err });

      return expectSaga(sagas.resetPassword, actions.resetPassword(payload))
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Signin User", () => {
    let payload: TLoginData;
    beforeAll(() => {
      payload = { email: userSession.email, password };
    });

    it("logical flow matches pattern for a new sign in session", () => {
      const res = { data: userSession };

      testSaga(sagas.signinUser, actions.signinUser(payload))
        .next()
        .call(app.post, "signin", payload)
        .next(res)
        .call(parseData, res)
        .next(res.data)
        .put(actions.signinSession(res.data))
        .next()
        .call(Router.replace, "/employee/dashboard")
        .next()
        .isDone();
    });

    it("sets the current signed in user from a session", async () => {
      mockApp.onPost("signin").reply(200, userSession);

      return expectSaga(sagas.signinUser, actions.signinUser(payload))
        .withReducer(authReducer)
        .hasFinalState(userSession)
        .run();
    });

    it("if signin API call fails, it displays a message", async () => {
      const err = "Unable to sign in.";
      mockApp.onPost("signin").reply(404, { err });

      return expectSaga(sagas.signinUser, actions.signinUser(payload))
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Signup User", () => {
    let payload: TSignupData;
    beforeAll(() => {
      payload = userSignup;
    });

    it("logical flow matches pattern for a new sign in session", () => {
      const message = "Welcome to the Ice Team!";
      const res = { data: { message } };

      testSaga(sagas.signupUser, actions.signupUser(payload))
        .next()
        .call(app.post, "signup", payload)
        .next(res)
        .call(parseMessage, res)
        .next(res.data.message)
        .call(toast, { type: "success", message: res.data.message })
        .next()
        .call(Router.push, "/employee/login")
        .next()
        .isDone();
    });

    it("creates a new user account", async () => {
      const message = "Welcome to the Ice Team!";
      mockApp.onPost("signup").reply(200, { message });

      return expectSaga(sagas.signupUser, actions.signupUser(payload))
        .withReducer(authReducer)
        .hasFinalState(initialState)
        .run();
    });

    it("if signup API call fails, it displays a message", async () => {
      const err = "Unable to sign up.";
      mockApp.onPost("signup").reply(404, { err });

      return expectSaga(sagas.signupUser, actions.signupUser(payload))
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Update User Avatar", () => {
    let form: FormData;
    let message: string;
    let avatar: string;
    beforeEach(() => {
      message = "Successfully updated your current avatar.";
      avatar = "http://localhost:3000/123.png";
      form = new FormData();
    });

    it("logical flow matches pattern for update user avatar requests", () => {
      const res = { data: { message, avatar } };

      testSaga(sagas.updateUserAvatar, actions.updateUserAvatar({ form, id }))
        .next()
        .call(avatarAPI.put, `update/${id}`, form)
        .next(res)
        .call(parseData, res)
        .next(res.data)
        .call(showMessage, res.data.message)
        .next(res.data)
        .put(actions.setUserAvatar({ avatar: res.data.avatar }))
        .next()
        .isDone();
    });

    it("successfully updates a user avatar", async () => {
      mockAPI.onPut(`update/${id}`).reply(200, { avatar, message });

      return expectSaga(
        sagas.updateUserAvatar,
        actions.updateUserAvatar({ form, id })
      )
        .withReducer(authReducer)
        .hasFinalState({
          ...initialState,
          avatar
        })
        .run();
    });

    it("if API call fails, it displays a message", async () => {
      const err = "Unable to update the user avatar.";
      mockAPI.onPut(`update/${id}`).reply(404, { err });

      return expectSaga(
        sagas.updateUserAvatar,
        actions.updateUserAvatar({ form, id })
      )
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Update Current User Password", () => {
    let payload: TNewPasswordData;
    beforeAll(() => {
      payload = { password, token };
    });

    it("logical flow matches pattern for a password update", () => {
      const message = "Your password has been reset!";
      const res = { data: { message } };

      testSaga(sagas.updateUserPassword, actions.updateUserPassword(payload))
        .next()
        .call(app.put, "new-password", payload)
        .next(res)
        .call(parseMessage, res)
        .next(res.data.message)
        .call(toast, { type: "success", message: res.data.message })
        .next()
        .call(sagas.signoutUserSession)
        .next()
        .isDone();
    });

    it("updates the current signed in user's password", async () => {
      const message = "Your password has been reset!";
      mockApp.onPut("new-password").reply(200, { message });
      mockApp.onGet("signout").reply(200, { message });

      return expectSaga(
        sagas.updateUserPassword,
        actions.updateUserPassword(payload)
      )
        .dispatch(actions.signinSession(userSession))
        .withReducer(authReducer)
        .hasFinalState({ ...initialState, role: "guest" })
        .run();
    });

    it("if new-password API call fails, it displays a message", async () => {
      const err = "Unable to update your password.";
      mockApp.onPut("new-password").reply(404, { err });

      return expectSaga(
        sagas.updateUserPassword,
        actions.updateUserPassword(payload)
      )
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });

  describe("Update Member's Settings", () => {
    let payload: TAuthData;
    beforeEach(() => {
      payload = {
        id: "0123456789",
        avatar: "",
        email: "test@test.com",
        emailReminders: true,
        firstName: "Bob",
        lastName: "Dole",
        role: "employee"
      };
    });

    it("logical flow matches pattern for updating crucial member's settings requests", () => {
      const message =
        "Your email has changed, please log out and log in with your new email.";
      const res = { data: { message } };

      testSaga(sagas.updateUserProfile, actions.updateUserProfile(payload))
        .next()
        .call(app.put, "member/settings/update", payload)
        .next(res)
        .call(parseData, res)
        .next(res.data)
        .call(showMessage, res.data.message)
        .next()
        .call(sagas.signoutUserSession)
        .next()
        .isDone();
    });

    it("logical flow matches pattern for updating non-crucial member's settings requests", () => {
      const message = "Successfully updated your settings.";
      const res = { data: { message, user: payload } };

      testSaga(sagas.updateUserProfile, actions.updateUserProfile(payload))
        .next()
        .call(app.put, "member/settings/update", payload)
        .next(res)
        .call(parseData, res)
        .next(res.data)
        .call(showMessage, res.data.message)
        .next(res.data)
        .put(actions.signinSession(res.data.user))
        .next()
        .isDone();
    });

    it("successfully updates a member's settings", async () => {
      const message = "Successfully updated your settings.";
      mockApp
        .onPut("member/settings/update")
        .reply(200, { message, user: payload });

      return expectSaga(
        sagas.updateUserProfile,
        actions.updateUserProfile(payload)
      )
        .withReducer(authReducer)
        .hasFinalState({ ...initialState, ...payload })
        .run();
    });

    it("if API call fails, it displays a message", async () => {
      const err = "Unable to update the member's settings.";
      mockApp.onPut("member/settings/update").reply(404, { err });

      return expectSaga(
        sagas.updateUserProfile,
        actions.updateUserProfile(payload)
      )
        .withReducer(serverReducer)
        .hasFinalState({
          error: err,
          message: ""
        })
        .run();
    });
  });
});
