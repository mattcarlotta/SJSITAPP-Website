import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToDeleteMail } from "~messages/errors";
import Mail, { IMailDocument } from "~models/mail";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newMail = {
  message: "<span>Hello</span>",
  sendTo: ["staffmember@example.com"],
  sendFrom: "staffmember@example.com",
  sendDate: new Date(),
  subject: "Test"
};

describe("Delete Mail Controller", () => {
  let cookie: string;
  let mail: IMailDocument;
  beforeAll(async () => {
    await connectToDB();
    mail = await Mail.create(newMail);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the mail id is invalid", done => {
    app()
      .delete("/api/mail/delete/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToDeleteMail);
        done();
      });
  });

  it("accepts requests to delete an mail", done => {
    app()
      .delete(`/api/mail/delete/${mail._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the email.");
        done();
      });
  });
});
