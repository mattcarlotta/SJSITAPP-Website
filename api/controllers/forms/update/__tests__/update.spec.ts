import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  formAlreadyExists,
  unableToLocateForm,
  unableToLocateSeason,
  unableToUpdateForm
} from "~messages/errors";
import Form, { IFormDocument } from "~models/form";
import { moment } from "~helpers";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newForm = {
  expirationDate: moment().add(7, "days").toDate(),
  startMonth: new Date("2000-12-01T07:00:00.000Z"),
  endMonth: new Date("2000-12-31T07:00:00.000Z"),
  notes: "Old Form 000",
  seasonId: "20002001",
  sendEmailNotificationsDate: moment().add(1, "day").toDate(),
  sentEmails: false
};

const startMonth = "2001-12-01T07:00:00.000Z";
const endMonth = "2001-12-31T07:00:00.000Z";

const existingForm = {
  ...newForm,
  startMonth,
  endMonth
};

const updatedForm = {
  ...newForm,
  startDate: "2001-01-01T07:00:00.000Z",
  endDate: "2001-01-31T07:00:00.000Z"
};

describe("Update Form Controller", () => {
  let cookie: string;
  let form: IFormDocument | null;
  beforeAll(async () => {
    await connectToDB();
    await Form.create(existingForm);
    const createdForm = await Form.create(newForm);
    form = await Form.findOne({ _id: createdForm._id }).lean();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the form properties are missing", done => {
    app()
      .put("/api/forms/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToUpdateForm);
        done();
      });
  });

  it("rejects requests where the seasonId isn't valid", done => {
    app()
      .put("/api/forms/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ ...updatedForm, id: form!._id, seasonId: "0000000" })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateSeason);
        done();
      });
  });

  it("rejects requests where the form id isn't valid", done => {
    app()
      .put("/api/forms/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ ...updatedForm, id: "a01dc43483adb35b1ca678ea" })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateForm);
        done();
      });
  });

  it("rejects requests where the form already exists", done => {
    app()
      .put("/api/forms/update")
      .set("Cookie", cookie)
      .send({ ...updatedForm, id: form!._id, startMonth, endMonth })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(formAlreadyExists);
        done();
      });
  });

  it("accepts requests to updates form while keeping the email sent status", done => {
    app()
      .put("/api/forms/update")
      .set("Cookie", cookie)
      .send({ ...updatedForm, id: form!._id })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully updated the AP form!");
        done();
      });
  });

  it("accepts requests to updates form while resetting the email sent status", done => {
    app()
      .put("/api/forms/update")
      .set("Cookie", cookie)
      .send({
        ...updatedForm,
        id: form!._id,
        sendEmailNotificationsDate: new Date("2001-01-07T07:00:00.000Z")
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully updated the AP form!");
        done();
      });
  });
});
