import { HYDRATE } from "next-redux-wrapper";
import * as constants from "~constants";
import authReducer, { initialState } from "../index";

const userSession = {
  id: "88",
  avatar: "",
  email: "test@example.com",
  firstName: "Beta",
  lastName: "Tester",
  role: "staff"
};

const payload = {
  auth: userSession
};

describe("Auth Reducer", () => {
  it("initially matches the initialState pattern", () => {
    expect(authReducer(undefined, { payload: {}, type: "" })).toEqual(
      initialState
    );
  });

  it("rehydrates the state", () => {
    const state = authReducer(undefined, { type: HYDRATE, payload });

    expect(state).toEqual(payload.auth);
  });

  it("updates a signed in user details", () => {
    const state = authReducer(undefined, {
      type: constants.USER_UPDATE_SESSION,
      payload: { ...userSession, firstName: "Alan" }
    });
    expect(state).toEqual({
      ...userSession,
      firstName: "Alan"
    });
  });

  it("updates a signed in user's avatar", () => {
    const state = authReducer(undefined, {
      type: constants.USER_UPDATE_SESSION,
      payload: { ...userSession, avatar: "example.com" }
    });
    expect(state).toEqual({
      ...userSession,
      avatar: "example.com"
    });
  });

  it("stores a signed in user", () => {
    const state = authReducer(undefined, {
      type: constants.USER_SET_SESSION,
      payload: userSession
    });
    expect(state).toEqual(userSession);
  });

  it("removes a signed in user", () => {
    let state = authReducer(undefined, {
      type: constants.USER_SET_SESSION,
      payload: userSession
    });
    expect(state).toEqual(userSession);

    state = authReducer(state, { type: constants.USER_REMOVE_SESSION });

    expect(state).toEqual({ ...initialState, role: "guest" });
  });
});
