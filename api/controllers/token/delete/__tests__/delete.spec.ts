import mongoose from "mongoose";
import { connectToDB } from "~database";
import { invalidDeleteTokenRequest } from "~messages/errors";
import Token, { ITokenDocument } from "~models/token";
import { createSignupToken } from "~helpers";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newToken = {
  authorizedEmail: "delete.token@test.com",
  role: "employee",
  expiration: new Date(),
  token: createSignupToken()
};

describe("Delete Token Controller", () => {
  let cookie: string;
  let token: ITokenDocument;
  beforeAll(async () => {
    await connectToDB();
    token = await Token.create(newToken);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the token id is invalid", done => {
    app()
      .delete("/api/token/delete/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(invalidDeleteTokenRequest);
        done();
      });
  });

  it("accepts requests to delete a token", done => {
    app()
      .delete(`/api/token/delete/${token._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          "Successfully deleted the authorization key."
        );
        done();
      });
  });
});
