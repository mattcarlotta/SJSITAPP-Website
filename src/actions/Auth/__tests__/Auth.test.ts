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

  it("removeSession returns SERVER_MESSAGE", () => {
    const value = actions.removeSession();

    expect(value).toEqual({ type: constants.USER_REMOVE_SESSION });
  });

  it("resetPassword returns USER_PASSWORD_RESET with an email as props", () => {
    const props = { email: user.email };

    const value = actions.resetPassword(props);

    expect(value).toEqual({ type: constants.USER_PASSWORD_RESET, props });
  });

  it("signinSession returns USER_SET_SESSION with user details as payload", () => {
    const payload = user;

    const value = actions.signinSession(payload);

    expect(value).toEqual({ type: constants.USER_SET_SESSION, payload });
  });

  it("signinUser returns USER_SIGNIN_ATTEMPT with email and password as props", () => {
    const props = { email: user.email, password };

    const value = actions.signinUser(props);

    expect(value).toEqual({ type: constants.USER_SIGNIN_ATTEMPT, props });
  });

  it("signoutUserSession returns USER_SIGNIN_ATTEMPT", () => {
    const value = actions.signoutUserSession();

    expect(value).toEqual({ type: constants.USER_SIGNOUT_SESSION });
  });

  it("signupUser returns USER_SIGNUP and user signup details as props", () => {
    const props = {
      token,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password
    };
    const value = actions.signupUser(props);

    expect(value).toEqual({ type: constants.USER_SIGNUP, props });
  });

  it("updateUserPassword returns USER_PASSWORD_UPDATE with an email as props", () => {
    const props = { password, token };

    const value = actions.updateUserPassword(props);

    expect(value).toEqual({ type: constants.USER_PASSWORD_UPDATE, props });
  });
});
