import mongoose from "mongoose";
import { connectToDB } from "~database";
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
  let user: IUserDocument;
  beforeAll(async () => {
    await connectToDB();
    const password = await User.createPassword(textPassword);
    user = await User.create({ ...newUser, password });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the email is missing", done => {
    app()
      .put("/api/reset-password")
      .send({ email: "" })
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.err).toEqual(missingEmailCreds);
        done();
      });
  });

  it("rejects requests where the email doesn't exist", done => {
    app()
      .put("/api/reset-password")
      .send({ email: "doesntexist@oops.com" })
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.err).toEqual(missingEmailCreds);
        done();
      });
  });

  it("accepts requests to reset passwords", done => {
    app()
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
