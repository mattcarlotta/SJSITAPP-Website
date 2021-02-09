import mongoose from "mongoose";
import { createConnectionToDatabase } from "~database";
import User, { IUserDocument } from "~models/user";
import { passwordResetToken } from "~messages/success";
import { missingEmailCreds } from "~messages/errors";
import { createSignupToken, createDate } from "~helpers";
import app from "~test/utils/testServer";

const textPassword = "123456789";
const newUser = {
  email: "hello7689@example.com",
  firstName: "Hello",
  lastName: "Goodbye",
  role: "employee",
  token: createSignupToken(),
  registered: createDate().toDate()
};

describe("Reset Password Controller", () => {
  let db: mongoose.Connection;
  let user: IUserDocument;
  beforeAll(async () => {
    db = await createConnectionToDatabase();
    const password = await User.createPassword(textPassword);
    user = await User.create({ ...newUser, password });
  });

  afterAll(async () => {
    await db.close();
  });

  it("rejects requests where the email is missing", async done => {
    await app()
      .put("/api/reset-password")
      .send({ email: "" })
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.err).toEqual(missingEmailCreds);
        done();
      });
  });

  it("rejects requests where the email doesn't exist", async done => {
    await app()
      .put("/api/reset-password")
      .send({ email: "doesntexist@oops.com" })
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.err).toEqual(missingEmailCreds);
        done();
      });
  });

  it("accepts requests to request reset passwords", async done => {
    await app()
      .put("/api/reset-password")
      .send({ email: user.email })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(passwordResetToken(user.email));
        done();
      });
  });
});
