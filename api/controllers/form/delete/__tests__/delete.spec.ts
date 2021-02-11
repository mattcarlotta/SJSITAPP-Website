import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import { unableToDeleteForm } from "~messages/errors";
import Form, { IFormDocument } from "~models/form";
import { moment } from "~helpers";
import app from "~test/utils/testServer";

const newForm = {
  expirationDate: moment().add(7, "days").toDate(),
  startMonth: new Date("2000-04-01T07:00:00.000Z"),
  endMonth: new Date("2000-04-30T07:00:00.000Z"),
  notes: "Old Form 111",
  seasonId: "20002001",
  sendEmailNotificationsDate: moment().add(1, "day").toDate(),
  sentEmails: false
};

describe("Delete Form Controller", () => {
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
      .delete("/api/form/delete/601dc43483adb35b1ca678ea")
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToDeleteForm);
        done();
      });
  });

  it("accepts requests to delete an form", done => {
    app()
      .delete(`/api/form/delete/${form._id}`)
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the form.");
        done();
      });
  });
});
