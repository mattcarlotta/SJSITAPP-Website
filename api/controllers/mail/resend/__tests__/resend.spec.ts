import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToLocateMail } from "~messages/errors";
import Mail, { IMailDocument } from "~models/mail";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newMail = {
  message: "<span>Hello</span>",
  sendTo: ["staffmember@example.com"],
  sendFrom: "staffmember@example.com",
  subject: "Test",
  sendDate: new Date()
};

describe("Mail Resend Controller", () => {
  let cookie: string;
  let email: IMailDocument;
  beforeAll(async () => {
    await connectToDB();
    email = await Mail.create(newMail);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the mail id is invalid", done => {
    app()
      .put("/api/mail/resend/a01dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateMail);
        done();
      });
  });

  it("accepts requests to resend an email", done => {
    app()
      .put(`/api/mail/resend/${email._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("That email will be resent shortly.");
        done();
      });
  });
});
