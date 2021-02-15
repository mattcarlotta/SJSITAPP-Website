import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  emailAssociatedWithKey,
  missingUpdateTokenParams,
  unableToLocateToken,
  unableToUpdateToken
} from "~messages/errors";
import Token, { ITokenDocument } from "~models/token";
import { createSignupToken } from "~helpers";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newToken = {
  authorizedEmail: "update.token@test.com",
  role: "employee",
  expiration: new Date(),
  token: createSignupToken()
};

const updatedToken = {
  authorizedEmail: "updated.token@test.com",
  role: "employee"
};

const usedToken = {
  authorizedEmail: "used.token3@test.com",
  email: "used.token3@test.com",
  role: "employee",
  expiration: new Date(),
  token: createSignupToken()
};

describe("Update Token Controller", () => {
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

  it("rejects requests where the token _id, authorizedEmail, role fields are missing", done => {
    app()
      .put("/api/token/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingUpdateTokenParams);
        done();
      });
  });

  it("rejects requests where the token id is invalid", done => {
    app()
      .put("/api/token/update")
      .set("Cookie", cookie)
      .send({ ...updatedToken, _id: "a01dc43483adb35b1ca678ea" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateToken);
        done();
      });
  });

  it("rejects requests where the token has already been used", done => {
    app()
      .put("/api/token/update")
      .set("Cookie", cookie)
      .send({ ...updatedToken, _id: oldToken._id })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToUpdateToken);
        done();
      });
  });

  it("rejects requests where the email has already been used", done => {
    app()
      .put("/api/token/update")
      .set("Cookie", cookie)
      .send({
        ...updatedToken,
        _id: token._id,
        authorizedEmail: "member@example.com"
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(emailAssociatedWithKey);
        done();
      });
  });

  it("accepts requests to update a token", done => {
    app()
      .put(`/api/token/update`)
      .set("Cookie", cookie)
      .send({
        ...updatedToken,
        _id: token._id
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          `Successfully updated and sent a new authorization key to ${updatedToken.authorizedEmail}.`
        );
        done();
      });
  });

  it("accepts requests to update an existing token without changing the authorized email", done => {
    app()
      .put(`/api/token/update`)
      .set("Cookie", cookie)
      .send({
        ...updatedToken,
        role: "staff",
        _id: token._id
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          `Successfully updated and sent a new authorization key to ${updatedToken.authorizedEmail}.`
        );
        done();
      });
  });
});
