import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToCreateNewMail } from "~messages/errors";
import { staffSignIn } from "~test/utils/signIn";
import { createDate } from "~helpers";
import app from "~test/utils/testServer";

const today = createDate();

const newMail = {
  message: "<span>Hello</span>",
  sendTo: ["staffmember@example.com"],
  subject: "Test"
};

describe("Create Mail Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the mail fields are missing", done => {
    app()
      .post("/api/mail/create")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToCreateNewMail);
        done();
      });
  });

  it("accepts requests to send an email with a send date", done => {
    app()
      .post("/api/mail/create")
      .set("Cookie", cookie)
      .send({ ...newMail, sendDate: today.toDate() })
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual(
          "An email has been created and will be sent shortly!"
        );
        done();
      });
  });
});
