import mongoose from "mongoose";
import { connectToDB } from "~database";
import { missingIds } from "~messages/errors";
import Form, { IFormDocument } from "~models/form";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newForm = {
  callTimes: [new Date("2001-02-07T07:05:30.000Z")],
  expirationDate: new Date("1499-08-01T07:00:00.000Z"),
  startMonth: new Date("1499-07-01T07:00:00.000Z"),
  endMonth: new Date("1499-07-31T07:00:00.000Z"),
  notes: "Old Form 23399",
  seasonId: "15991600",
  sendEmailNotificationsDate: new Date("2001-07-05T07:00:00.000Z"),
  sentEmails: false
};

const newForm2 = {
  callTimes: [new Date("2001-02-07T07:05:30.000Z")],
  expirationDate: new Date("1499-08-01T07:00:00.000Z"),
  startMonth: new Date("1499-08-01T07:00:00.000Z"),
  endMonth: new Date("1499-08-31T07:00:00.000Z"),
  notes: "Old Form 8458458",
  seasonId: "15991600",
  sendEmailNotificationsDate: new Date("1499-08-01T07:00:00.000Z"),
  sentEmails: false
};

describe("Delete Many forms Controller", () => {
  let cookie: string;
  let form: IFormDocument;
  let form2: IFormDocument;
  beforeAll(async () => {
    await connectToDB();
    form = await Form.create(newForm);
    form2 = await Form.create(newForm2);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the form ids are missing", done => {
    app()
      .delete("/api/forms/delete-many")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingIds);
        done();
      });
  });

  it("accepts requests to delete an form", done => {
    app()
      .delete("/api/forms/delete-many")
      .set("Cookie", cookie)
      .send({ ids: [form._id, form2._id] })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the forms.");
        done();
      });
  });
});
