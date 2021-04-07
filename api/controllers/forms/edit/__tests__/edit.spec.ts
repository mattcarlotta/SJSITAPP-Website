import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToLocateForm } from "~messages/errors";
import Form, { IFormDocument } from "~models/form";
import { staffSignIn } from "~test/utils/signIn";
import { moment } from "~helpers";
import app from "~test/utils/testServer";

const newForm = {
  expirationDate: moment().add(7, "days").toDate(),
  startMonth: new Date("2000-10-01T07:00:00.000Z"),
  endMonth: new Date("2000-10-31T07:00:00.000Z"),
  notes: "Old Form 678",
  seasonId: "20002001",
  sendEmailNotificationsDate: moment().add(1, "day").toDate(),
  sentEmails: false
};

describe("Edit Form Controller", () => {
  let cookie: string;
  let form: IFormDocument;
  beforeAll(async () => {
    await connectToDB();
    form = await Form.create(newForm);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the form id is invalid", done => {
    app()
      .get("/api/forms/edit/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateForm);
        done();
      });
  });

  it("accepts requests to retrieve an form for editing", done => {
    app()
      .get(`/api/forms/edit/${form._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.form).toEqual({
          _id: expect.any(String),
          endMonth: expect.any(String),
          expirationDate: expect.any(String),
          notes: expect.any(String),
          seasonId: expect.any(String),
          sendEmailNotificationsDate: expect.any(String),
          sentEmails: expect.any(Boolean),
          startMonth: expect.any(String)
        });
        done();
      });
  });
});
