import mongoose from "mongoose";
import { connectToDB } from "~database";
import { missingIds } from "~messages/errors";
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

describe("Delete Many Emails Controller", () => {
  let cookie: string;
  let mail: IMailDocument;
  let mail2: IMailDocument;
  beforeAll(async () => {
    await connectToDB();
    mail = await Mail.create(newMail);
    mail2 = await Mail.create(newMail);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the mail ids are missing", done => {
    app()
      .delete("/api/mail/delete-many")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingIds);
        done();
      });
  });

  it("accepts requests to delete mail", done => {
    app()
      .delete("/api/mail/delete-many")
      .set("Cookie", cookie)
      .send({ ids: [mail._id, mail2._id] })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the mail.");
        done();
      });
  });
});
