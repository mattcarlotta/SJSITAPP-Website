import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToLocateToken, unableToUpdateToken } from "~messages/errors";
import Token, { ITokenDocument } from "~models/token";
import { createSignupToken } from "~helpers";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newToken = {
  authorizedEmail: "edit.token@test.com",
  role: "employee",
  expiration: new Date(),
  token: createSignupToken()
};

const usedToken = {
  authorizedEmail: "used.token@test.com",
  email: "used.token@test.com",
  role: "employee",
  expiration: new Date(),
  token: createSignupToken()
};

describe("Edit Token Controller", () => {
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
      .get("/api/token/edit/601dc43483adb35b1ca678ea")
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
      .get(`/api/token/edit/${oldToken._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToUpdateToken);
        done();
      });
  });

  it("accepts requests to edit a token", done => {
    app()
      .get(`/api/token/edit/${token._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.token).toEqual({
          _id: expect.any(String),
          authorizedEmail: expect.any(String),
          role: expect.any(String),
          expiration: expect.any(String)
        });
        done();
      });
  });
});
