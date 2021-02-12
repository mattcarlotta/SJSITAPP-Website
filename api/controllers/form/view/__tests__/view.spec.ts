import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  expiredForm,
  unableToLocateEvents,
  unableToLocateForm
} from "~messages/errors";
import Form, { IFormDocument } from "~models/form";
import { moment } from "~helpers";
import app from "~test/utils/testServer";
import { staffSignIn } from "~test/utils/signIn";

const newForm = {
  callTimes: [new Date("2001-02-07T07:05:30.000Z")],
  expirationDate: new Date("2001-02-07T07:00:00.000Z"),
  startMonth: new Date("2001-02-01T07:00:00.000Z"),
  endMonth: new Date("2001-02-28T07:00:00.000Z"),
  notes: "Old Form 84818",
  seasonId: "20002001",
  sendEmailNotificationsDate: new Date("2001-02-05T07:00:00.000Z"),
  sentEmails: false
};

const newForm2 = {
  callTimes: [new Date("2001-02-07T07:05:30.000Z")],
  expirationDate: moment().add(7, "days").toDate(),
  startMonth: new Date("1499-08-01T07:00:00.000Z"),
  endMonth: new Date("1499-08-31T07:00:00.000Z"),
  notes: "Old Form 38438348",
  seasonId: "14991500",
  sendEmailNotificationsDate: moment().add(1, "day").toDate(),
  sentEmails: false
};

describe("Review Form Controller", () => {
  let cookie: string;
  let form: IFormDocument;
  let activeForm: IFormDocument;
  beforeAll(async () => {
    await connectToDB();
    form = await Form.create(newForm);
    activeForm = await Form.create(newForm2);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the form id is invalid", done => {
    app()
      .get("/api/form/view/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateForm);
        done();
      });
  });

  it("rejects requests to view a form that has already expired", done => {
    app()
      .get(`/api/form/view/${form.id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(
          expiredForm(
            moment(newForm.expirationDate, "MMMM Do, YYYY @ hh:mma").format(
              "MMMM Do, YYYY @ hh:mma"
            )
          )
        );
        done();
      });
  });

  it("rejects requests to view a form that doesn't have any events", done => {
    app()
      .get(`/api/form/view/${activeForm.id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(
          unableToLocateEvents(
            moment(activeForm.startMonth, "L").format("L"),
            moment(activeForm.endMonth, "L").format("L")
          )
        );
        done();
      });
  });

  it("accepts requests to retrieve an form for scheduling", async done => {
    const existingForm = await Form.findOne({ notes: "Todays Form" });

    app()
      .get(`/api/form/view/${existingForm!._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          form: expect.objectContaining({
            _id: expect.any(String),
            endMonth: expect.any(String),
            expirationDate: expect.any(String),
            notes: expect.any(String),
            sendEmailNotificationsDate: expect.any(String),
            sentEmails: expect.any(Boolean),
            startMonth: expect.any(String)
          }),
          events: expect.arrayContaining([
            expect.objectContaining({
              location: expect.any(String),
              team: expect.any(String),
              opponent: expect.any(String),
              eventDate: expect.any(String),
              eventType: expect.any(String),
              notes: expect.any(String),
              employeeResponse: expect.any(Array)
            })
          ])
        });
        done();
      });
  });
});
