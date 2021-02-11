import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import {
  formAlreadyExists,
  invalidExpirationDate,
  invalidSendEmailNoteDate,
  unableToCreateNewForm,
  unableToLocateSeason
} from "~messages/errors";
import { moment } from "~helpers";
import app from "~test/utils/testServer";

const newForm = {
  expirationDate: moment().add(7, "days").toDate(),
  enrollMonth: [
    new Date("2000-06-01T07:00:00.000Z"),
    new Date("2000-06-30T07:00:00.000Z")
  ],
  notes: "Old Form 123",
  seasonId: "20002001",
  sendEmailNotificationsDate: moment().add(7, "days").toDate(),
  sentEmails: false
};

describe("Create Form Controller", () => {
  let res: request.Response;
  beforeAll(async () => {
    await connectToDB();
    res = await app()
      .post("/api/signin")
      .send({ email: "staffmember@example.com", password: "password" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the form fields are missing", done => {
    app()
      .post("/api/form/create")
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToCreateNewForm);
        done();
      });
  });

  it("rejects requests where the seasonId is valid", done => {
    app()
      .post("/api/form/create")
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .send({ ...newForm, seasonId: "10001001" })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateSeason);
        done();
      });
  });

  it("rejects requests where the form already exists", done => {
    app()
      .post("/api/form/create")
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .send({
        ...newForm,
        enrollMonth: [
          new Date("2000-08-01T07:00:00.000Z"),
          new Date("2000-08-31T07:00:00.000Z")
        ]
      })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(formAlreadyExists);
        done();
      });
  });

  it("rejects requests where the form expiration date has already past", done => {
    app()
      .post("/api/form/create")
      .set("Cookie", res.header["set-cookie"])
      .send({ ...newForm, expirationDate: new Date(1800, 1, 1) })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(invalidExpirationDate);
        done();
      });
  });

  it("rejects requests where the form expiration send emial date has already past", done => {
    app()
      .post("/api/form/create")
      .set("Cookie", res.header["set-cookie"])
      .send({ ...newForm, sendEmailNotificationsDate: new Date(1800, 1, 1) })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(invalidSendEmailNoteDate);
        done();
      });
  });

  it("accepts requests to create an form", done => {
    app()
      .post("/api/form/create")
      .set("Cookie", res.header["set-cookie"])
      .send(newForm)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual("Successfully created a new form!");
        done();
      });
  });
});
