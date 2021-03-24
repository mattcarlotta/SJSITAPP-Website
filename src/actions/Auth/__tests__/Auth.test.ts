import * as constants from "~constants";
import * as actions from "../index";

const user = {
  id: "23823838328",
  avatar: "",
  email: "t@t.com",
  firstName: "Example",
  lastName: "User",
  role: "employee"
};

const token = "1348690";
const password = "password";

describe("Auth Actions", () => {
  it("checkForActiveSession returns USER_CHECK_SESSION", () => {
    const value = actions.checkForActiveSession();

    expect(value).toEqual({ type: constants.USER_CHECK_SESSION });
  });

  it("deleteUserAvatar returns USER_DELETE_AVATAR with an id as payload", () => {
    const payload = user.id;
    const value = actions.deleteUserAvatar(payload);

    expect(value).toEqual({ type: constants.USER_DELETE_AVATAR, payload });
  });

  it("removeSession returns SERVER_MESSAGE", () => {
    const value = actions.removeSession();

    expect(value).toEqual({ type: constants.USER_REMOVE_SESSION });
  });

  it("resetPassword returns USER_PASSWORD_RESET with an email as payload", () => {
    const payload = { email: user.email };

    const value = actions.resetPassword(payload);

    expect(value).toEqual({ type: constants.USER_PASSWORD_RESET, payload });
  });

  it("setUserAvatar returns USER_SET_AVATAR with avatar as payload", () => {
    const payload = { avatar: "http://localhost:3000/123.png" };
    const value = actions.setUserAvatar(payload);

    expect(value).toEqual({ type: constants.USER_SET_AVATAR, payload });
  });

  it("signinSession returns USER_SET_SESSION with user details as payload", () => {
    const payload = user;

    const value = actions.signinSession(payload);

    expect(value).toEqual({ type: constants.USER_SET_SESSION, payload });
  });

  it("signinSession returns USER_SET_SESSION with guest details as payload", () => {
    const value = actions.signinSession({});

    expect(value).toEqual({
      type: constants.USER_SET_SESSION,
      payload: { role: "guest" }
    });
  });

  it("signinUser returns USER_SIGNIN_ATTEMPT with email and password as payload", () => {
    const payload = { email: user.email, password };

    const value = actions.signinUser(payload);

    expect(value).toEqual({ type: constants.USER_SIGNIN_ATTEMPT, payload });
  });

  it("signoutUserSession returns USER_SIGNIN_ATTEMPT", () => {
    const value = actions.signoutUserSession();

    expect(value).toEqual({ type: constants.USER_SIGNOUT_SESSION });
  });

  it("signupUser returns USER_SIGNUP and user signup details as payload", () => {
    const payload = {
      token,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password
    };
    const value = actions.signupUser(payload);

    expect(value).toEqual({ type: constants.USER_SIGNUP, payload });
  });

  it("updateUserProfile returns USER_UPDATE_PROFILE with user details as payload", () => {
    const value = actions.updateUserProfile(user);

    expect(value).toEqual({
      type: constants.USER_UPDATE_PROFILE,
      payload: user
    });
  });

  it("updateUserAvatar returns USER_UPDATE_AVATAR with form and id as payload", () => {
    const payload = { form: new FormData(), id: user.id };
    const value = actions.updateUserAvatar(payload);

    expect(value).toEqual({
      type: constants.USER_UPDATE_AVATAR,
      payload
    });
  });

  it("updateUserPassword returns USER_PASSWORD_UPDATE with an email as payload", () => {
    const payload = { password, token };

    const value = actions.updateUserPassword(payload);

    expect(value).toEqual({ type: constants.USER_PASSWORD_UPDATE, payload });
  });
});
