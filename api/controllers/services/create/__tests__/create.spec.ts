import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToCreateNewService } from "~messages/errors";
import app from "~test/utils/testServer";
import { staffSignIn } from "~test/utils/signIn";

const service = {
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

describe("Create Service Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the service fields are missing", done => {
    app()
      .post("/api/service/create")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToCreateNewService);
        done();
      });
  });

  it("accepts requests to create a new service", done => {
    app()
      .post("/api/service/create")
      .set("Cookie", cookie)
      .send(service)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual("Successfully created the services!");
        done();
      });
  });
});
