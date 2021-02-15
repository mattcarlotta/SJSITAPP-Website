import mongoose from "mongoose";
import { connectToDB } from "~database";
import Mail, { IMailDocument } from "~models/mail";
import { unableToUpdateMail, unableToLocateMail } from "~messages/errors";
import { createDate } from "~helpers";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const yesterday = createDate().subtract(1, "day");
const tomorrow = createDate().add(1, "day");
const format = "MMMM Do YYYY @ hh:mm a";

const newMail = {
  message: "<span>Hello</span>",
  sendTo: ["staffmember@example.com"],
  sendFrom: "staffmember@example.com",
  subject: "Test",
  sendDate: tomorrow.toDate()
};

const updatedEmail = {
  ...newMail,
  message: "<span>Goodbye</span>",
  sendDate: yesterday.toDate()
};

describe("Mail Update Controller", () => {
  let cookie: string;
  let mail: IMailDocument;
  beforeAll(async () => {
    await connectToDB();
    const createdEvent = await Mail.create(newMail);
    mail = await Mail.findOne({ _id: createdEvent._id }).lean();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the mail properties are missing", done => {
    app()
      .put("/api/mail/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToUpdateMail);
        done();
      });
  });

  it("rejects requests where the mail id property is invalid", done => {
    app()
      .put("/api/mail/update")
      .set("Cookie", cookie)
      .send({ ...updatedEmail, _id: "601dc43483adb35b1ca678ea" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateMail);
        done();
      });
  });

  it("accepts requests to updates an mail and sends out at specfic date", done => {
    app()
      .put("/api/mail/update")
      .set("Cookie", cookie)
      .send({ ...mail, message: "<span>Goodbye<span>" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          `Successfully updated the email and it will be sent ${tomorrow.format(
            format
          )}!`
        );
        done();
      });
  });

  it("accepts requests to update an mail and sends out shortly", done => {
    app()
      .put("/api/mail/update")
      .set("Cookie", cookie)
      .send({ ...updatedEmail, _id: mail._id })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          "Successfully updated the email and it will be sent shortly!"
        );
        done();
      });
  });
});
