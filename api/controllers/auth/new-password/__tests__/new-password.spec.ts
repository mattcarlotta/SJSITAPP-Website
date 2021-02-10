import mongoose from "mongoose";
import { connectToDB } from "~database";
import User, { IUserDocument } from "~models/user";
import { passwordResetSuccess } from "~messages/success";
import {
  emptyPassword,
  invalidToken,
  notUniquePassword
} from "~messages/errors";
import { createSignupToken, createDate } from "~helpers";
import app from "~test/utils/testServer";

const textPassword = "123456789";
const newUser = {
  email: "hello123456@example.com",
  firstName: "Hello",
  lastName: "Goodbye",
  role: "employee",
  token: createSignupToken(),
  registered: createDate().toDate()
};

describe("New Password Controller", () => {
  let user: IUserDocument;
  beforeAll(async () => {
    await connectToDB();
    const password = await User.createPassword(textPassword);
    user = await User.create({ ...newUser, password });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the token is missing", done => {
    app()
      .put("/api/new-password")
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.err).toEqual(invalidToken);
        done();
      });
  });

  it("rejects requests where the token is missing", done => {
    app()
      .put("/api/new-password")
      .send({ token: "123464647", password: "test" })
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.err).toEqual(invalidToken);
        done();
      });
  });

  it("rejects requests where the password is missing", done => {
    app()
      .put("/api/new-password")
      .send({ token: user.token, password: "" })
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.err).toEqual(emptyPassword);
        done();
      });
  });

  it("rejects requests where the password is the same", done => {
    app()
      .put("/api/new-password")
      .send({ token: user.token, password: textPassword })
      .expect("Content-Type", /json/)
      .expect(404)
      .then(res => {
        expect(res.body.err).toEqual(notUniquePassword);
        done();
      });
  });

  it("accepts requests to set new passwords", done => {
    app()
      .put("/api/new-password")
      .send({ token: user.token, password: "newpassword1234" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(passwordResetSuccess(user.email));
        done();
      });
  });
});
