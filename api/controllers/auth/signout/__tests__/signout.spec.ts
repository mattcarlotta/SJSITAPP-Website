import app from "~test/utils/testServer";

describe("Sign Out Controller", () => {
  it("accepts requests to remove a user session", done => {
    app().get("/api/signout").expect("Content-Type", /json/).expect(200, done);
  });
});
