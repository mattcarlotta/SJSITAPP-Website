import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToLocateToken, unableToUpdateToken } from "~messages/errors";
import Token, { ITokenDocument } from "~models/token";
import { createSignupToken } from "~helpers";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newToken = {
  authorizedEmail: "resend.token@test.com",
  role: "member",
  expiration: new Date(),
  token: createSignupToken()
};

const usedToken = {
  authorizedEmail: "used.token2@test.com",
  email: "used.token2@test.com",
  role: "member",
  expiration: new Date(),
  token: createSignupToken()
};

describe("Token Resend Controller", () => {
  let cookie: string;
  let token: ITokenDocument;
  let oldToken: ITokenDocument;
  beforeAll(async () => {
    await connectToDB();
    token = await Token.create(newToken);
    oldToken = await Token.create(usedToken);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the token id is invalid", done => {
    app()
      .put("/api/token/resend-email/a01dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateToken);
        done();
      });
  });

  it("rejects requests where the token has already been used", done => {
    app()
      .put(`/api/token/resend-email/${oldToken._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToUpdateToken);
        done();
      });
  });

  it("accepts requests to resend a token", done => {
    app()
      .put(`/api/token/resend-email/${token._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual(
          `An authorization key will be resent to ${newToken.authorizedEmail} shortly.`
        );
        done();
      });
  });
});
