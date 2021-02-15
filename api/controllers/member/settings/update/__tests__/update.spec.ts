import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  emailAlreadyTaken,
  missingUpdateMemberParams,
  usernameAlreadyTaken
} from "~messages/errors";
import { createDate, createSignupToken } from "~helpers";
import User, { IUserDocument } from "~models/user";
import { memberSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const textPassword = "password";
const newUser = {
  email: "updateme1234@example.com",
  firstName: "Hello",
  lastName: "Goodbye",
  role: "employee",
  token: createSignupToken(),
  registered: createDate().toDate()
};

const updatedSettings = {
  email: "dkfsdfkdskmfk2332343@example.com",
  emailReminders: false,
  firstName: "Goobyde",
  lastName: "Hello"
};

describe("Member Settings Update Controller", () => {
  let user: IUserDocument;
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    const password = await User.createPassword(textPassword);
    user = await User.create({ ...newUser, password });
    cookie = await memberSignIn(user.email);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the submitted settings are missing email, emailReminders, firstName, lastName", done => {
    app()
      .put("/api/member/settings/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ email: "", emailReminders: "", firstName: "", lastName: "" })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingUpdateMemberParams);
        done();
      });
  });

  it("rejects requests where the submitted settings contain another active email account", done => {
    app()
      .put("/api/member/settings/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ ...updatedSettings, email: "scheduledmember@test.com" })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(emailAlreadyTaken);
        done();
      });
  });

  it("rejects requests where the submitted settings contain another active user's name", done => {
    app()
      .put("/api/member/settings/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ ...updatedSettings, firstName: "Scheduled", lastName: "Member" })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(usernameAlreadyTaken);
        done();
      });
  });

  it("accepts requests where the submitted settings include changing the email", done => {
    app()
      .put("/api/member/settings/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send(updatedSettings)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          "Your profile has been updated. Please re-log into your account with your new email address."
        );
        done();
      });
  });

  it("accepts requests where the submitted settings don't include changing the email", done => {
    app()
      .put("/api/member/settings/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send(updatedSettings)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully updated your settings.");
        done();
      });
  });
});
