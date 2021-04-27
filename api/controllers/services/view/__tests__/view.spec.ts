import mongoose from "mongoose";
import { connectToDB } from "~database";
import Service from "~models/service";
import app from "~test/utils/testServer";
import { staffSignIn } from "~test/utils/signIn";

const newService = {
  automatedOnline: true,
  emailOnline: true,
  eventOnline: true,
  formReminderOnline: true,
  scheduleOnline: true,
  eventDay: "16th",
  eventMonth: "April",
  eventTime: "07:59 am",
  formReminderDay: "5th",
  formReminderMonth: "April",
  formReminderTime: "05:00 pm",
  scheduleDay: "15th",
  scheduleMonth: "April",
  scheduleTime: "06:00 pm"
};

describe("Review Service Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    await Service.create(newService);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve the service", done => {
    app()
      .get("/api/service/view")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            automatedOnline: expect.any(Boolean),
            emailOnline: expect.any(Boolean),
            eventOnline: expect.any(Boolean),
            formReminderOnline: expect.any(Boolean),
            scheduleOnline: expect.any(Boolean),
            eventDay: expect.any(String),
            eventMonth: expect.any(String),
            eventTime: expect.any(String),
            formReminderDay: expect.any(String),
            formReminderMonth: expect.any(String),
            formReminderTime: expect.any(String),
            scheduleDay: expect.any(String),
            scheduleMonth: expect.any(String),
            scheduleTime: expect.any(String)
          })
        );
        done();
      });
  });
});
