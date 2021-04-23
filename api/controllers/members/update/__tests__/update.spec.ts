import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  emailAlreadyTaken,
  missingUpdateMemberParams,
  unableToLocateMember,
  usernameAlreadyTaken
} from "~messages/errors";
import { createDate, createSignupToken } from "~helpers";
import User, { IUserDocument } from "~models/user";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const textPassword = "password";
const newUser = {
  email: "updateamember@example.com",
  firstName: "Hello",
  lastName: "Goodbye",
  role: "member",
  token: createSignupToken(),
  registered: createDate().toDate()
};

const updatedSettings = {
  email: "es8r38rnsdjjfn8@example.com",
  emailReminders: false,
  firstName: "Goodbye",
  lastName: "Hello"
};

describe("Member Update Controller", () => {
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

  it("rejects requests where the submitted member updated _id, email, emailReminders, firstName, lastName, role fields are missing", done => {
    app()
      .put("/api/members/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingUpdateMemberParams);
        done();
      });
  });

  it("rejects requests where the submitted member updates contain an invalid id", done => {
    app()
      .put("/api/members/update")
      .set("Cookie", cookie)
      .send({ ...user, id: "601dc43483adb35b1ca678ea" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateMember);
        done();
      });
  });

  it("rejects requests where the submitted settings contain another active email account", done => {
    app()
      .put("/api/members/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ ...user, id: user._id, email: "scheduledmember@test.com" })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(emailAlreadyTaken);
        done();
      });
  });

  it("rejects requests where the submitted settings contain another active user's name", done => {
    app()
      .put("/api/members/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({
        ...user,
        id: user._id,
        firstName: "Scheduled",
        lastName: "Member"
      })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(usernameAlreadyTaken);
        done();
      });
  });

  it("accepts requests to update the member", done => {
    app()
      .put("/api/members/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ ...user, ...updatedSettings, id: user._id })
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          "Successfully updated the member profile."
        );
        done();
      });
  });

  it("accepts requests to update the member's role", done => {
    app()
      .put("/api/members/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ ...user, ...updatedSettings, id: user._id, role: "staff" })
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          "Successfully updated the member profile."
        );
        done();
      });
  });
});
