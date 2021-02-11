import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import { unableToLocateForm } from "~messages/errors";
import Form, { IFormDocument } from "~models/form";
import { moment } from "~helpers";
import app from "~test/utils/testServer";

const newForm = {
  expirationDate: moment().add(7, "days").toDate(),
  startMonth: new Date("2000-11-01T07:00:00.000Z"),
  endMonth: new Date("2000-11-30T07:00:00.000Z"),
  notes: "Old Form 999",
  seasonId: "20002001",
  sendEmailNotificationsDate: moment().add(1, "day").toDate(),
  sentEmails: false
};

describe("Create Form Controller", () => {
  let res: request.Response;
  let form: IFormDocument;
  beforeAll(async () => {
    await connectToDB();
    form = await Form.create(newForm);
    res = await app()
      .post("/api/signin")
      .send({ email: "staffmember@example.com", password: "password" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the form id is invalid", done => {
    app()
      .put("/api/form/resend-email/a01dc43483adb35b1ca678ea")
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateForm);
        done();
      });
  });

  it("accepts requests to retrieve an form for editing", done => {
    app()
      .put(`/api/form/resend-email/${form._id}`)
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          "Email notifications for that form will be resent shortly."
        );
        done();
      });
  });
});
