import mongoose from "mongoose";
import { connectToDB } from "~database";
import { invalidContactUsRequest } from "~messages/errors";
import { memberSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const role = "Staff";

describe("Contact Us Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await memberSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the mail fields are missing", done => {
    app()
      .post("/api/mail/contact")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(invalidContactUsRequest);
        done();
      });
  });

  it("accepts requests to send staff/admin an email", done => {
    app()
      .post("/api/mail/contact")
      .set("Cookie", cookie)
      .send({ message: "<span>Hello</span>", sendTo: role, subject: "Test" })
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual(
          `Thank you for contacting us. The ${role.toLowerCase()} has received your message. Expect a response within 24 hours.`
        );
        done();
      });
  });
});
