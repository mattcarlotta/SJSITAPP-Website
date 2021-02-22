import * as constants from "~constants";
import * as actions from "../index";

describe("Server Actions", () => {
  it("resetMessage returns SERVER_RESET_MESSAGE", () => {
    const value = actions.resetMessage();

    expect(value).toEqual({ type: constants.SERVER_RESET_MESSAGE });
  });

  it("setMessage returns SERVER_MESSAGE and message as payload", () => {
    const value = actions.setMessage("hello");

    expect(value).toEqual({ type: constants.SERVER_MESSAGE, payload: "hello" });
  });

  it("returns SERVER_ERROR_MESSAGE with a message", () => {
    const payload = "Invalid request.";

    const value = actions.setError(payload);

    expect(value).toEqual({ type: constants.SERVER_ERROR_MESSAGE, payload });
  });
});
