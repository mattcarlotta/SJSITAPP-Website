import mongoose from "mongoose";
import { connectToDB } from "~database";
import { ITokenDocument } from "~models/token";
import {
  expiredToken,
  invalidSignupEmail,
  invalidToken,
  missingSignupCreds,
  tokenAlreadyUsed,
  usernameAlreadyTaken
} from "~messages/errors";
import { Season, Token } from "~models";
import { thanksForReg } from "~messages/success";
import { createSignupToken } from "~helpers";
import app from "~test/utils/testServer";

const newSeason = {
  seasonId: "20402041",
  startDate: new Date(2040, 9, 6),
  endDate: new Date(2041, 7, 6)
};

const newHire = {
  authorizedEmail: "signuptoken@example.com",
  role: "employee",
  seasonId: "20402041",
  token: createSignupToken(),
  expiration: new Date(2080, 10, 6)
};

const oldHire = {
  authorizedEmail: "old@example.com",
  role: "employee",
  seasonId: "19701971",
  token: createSignupToken(),
  expiration: new Date(1970, 10, 6)
};

const fakeCreds = {
  email: "bad@email.com",
  password: "123456",
  firstName: "bad",
  lastName: "email",
  token: "invalid"
};

describe("Sign Up Controller", () => {
  let signupToken: ITokenDocument;
  beforeAll(async () => {
    await connectToDB();
    await Season.create(newSeason);
    await Token.create(oldHire);
    signupToken = await Token.create(newHire);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the signup fields are missing", done => {
    app()
      .post("/api/signup")
      .expect("Content-Type", /json/)
      .send({ email: "", firstName: "", lastName: "", password: "", token: "" })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(missingSignupCreds);
        done();
      });
  });

  it("rejects requests where the token is invalid", done => {
    app()
      .post("/api/signup")
      .expect("Content-Type", /json/)
      .send(fakeCreds)
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(invalidToken);
        done();
      });
  });

  it("rejects requests where the authorized email doesn't match supplied email", done => {
    app()
      .post("/api/signup")
      .expect("Content-Type", /json/)
      .send({ ...fakeCreds, token: signupToken!.token })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(invalidSignupEmail);
        done();
      });
  });

  it("rejects requests where the token has already been used", async done => {
    const usedToken = await Token.findOne({ email: "member@example.com" });

    await app()
      .post("/api/signup")
      .expect("Content-Type", /json/)
      .send({ ...fakeCreds, email: usedToken!.email, token: usedToken!.token })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(tokenAlreadyUsed);
        done();
      });
  });

  it("rejects requests where the first and last name are already associated with an active account", done => {
    app()
      .post("/api/signup")
      .expect("Content-Type", /json/)
      .send({
        ...fakeCreds,
        email: "signuptoken@example.com",
        firstName: "Staff",
        lastName: "Member",
        token: signupToken!.token
      })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(usernameAlreadyTaken);
        done();
      });
  });

  it("rejects requests where the token has expired", done => {
    app()
      .post("/api/signup")
      .expect("Content-Type", /json/)
      .send({
        ...fakeCreds,
        email: oldHire.authorizedEmail,
        token: oldHire.token
      })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(expiredToken);
        done();
      });
  });

  it("accepts requests where the signup is valid", done => {
    app()
      .post("/api/signup")
      .expect("Content-Type", /json/)
      .send({
        ...fakeCreds,
        email: newHire.authorizedEmail,
        token: newHire.token
      })
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual(
          thanksForReg(fakeCreds.firstName, fakeCreds.lastName)
        );
        done();
      });
  });
});
