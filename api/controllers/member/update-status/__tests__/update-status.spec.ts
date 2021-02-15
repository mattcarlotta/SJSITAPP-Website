import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  missingUpdateMemberStatusParams,
  unableToLocateMember
} from "~messages/errors";
import { createDate, createSignupToken } from "~helpers";
import User, { IUserDocument } from "~models/user";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const textPassword = "password";
const newUser = {
  email: "updateamemberstatus@example.com",
  firstName: "Hello",
  lastName: "Goodbye",
  role: "employee",
  token: createSignupToken(),
  registered: createDate().toDate()
};

describe("Member Update Status Controller", () => {
  let user: IUserDocument;
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    const password = await User.createPassword(textPassword);
    await User.create({ ...newUser, password });
    user = await User.findOne({ email: newUser.email }).lean();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the submitted member updated _id and status are missing", done => {
    app()
      .put("/api/member/update-status")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingUpdateMemberStatusParams);
        done();
      });
  });

  it("rejects requests where the submitted member update status contains an invalid id", done => {
    app()
      .put("/api/member/update-status")
      .set("Cookie", cookie)
      .send({ status: "active", _id: "601dc43483adb35b1ca678ea" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateMember);
        done();
      });
  });

  it("accepts requests to deactivate an account", done => {
    app()
      .put("/api/member/update-status")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ _id: user!._id, status: "active" })
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Member has been suspended.");
        done();
      });
  });

  it("accepts requests to deactivate an account", done => {
    app()
      .put("/api/member/update-status")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ _id: user!._id, status: "suspend" })
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Member has been reactivated.");
        done();
      });
  });
});
