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

describe("Edit Mail Controller", () => {
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
      .get("/api/mail/edit/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateMail);
        done();
      });
  });

  it("accepts requests to retrieve an mail for editing", done => {
    app()
      .get(`/api/mail/edit/${mail._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.email).toEqual({
          _id: expect.any(String),
          message: expect.any(String),
          sendTo: expect.arrayContaining([expect.any(String)]),
          sendFrom: expect.any(String),
          subject: expect.any(String),
          sendDate: expect.any(String),
          status: expect.any(String)
        });
        done();
      });
  });
});
