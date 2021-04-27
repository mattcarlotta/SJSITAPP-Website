import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToLocateService, unableToUpdateService } from "~messages/errors";
import Service, { IServiceDocument } from "~models/service";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

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

const updatedService = {
  automatedOnline: false,
  emailOnline: false,
  eventOnline: false,
  formReminderOnline: false,
  scheduleOnline: false,
  eventDay: "16th",
  eventTime: "07:59 am",
  formReminderDay: "5th",
  formReminderTime: "05:00 pm",
  scheduleDay: "15th",
  scheduleTime: "06:00 pm"
};

describe("Update Service Controller", () => {
  let cookie: string;
  let service: IServiceDocument;
  beforeAll(async () => {
    await connectToDB();
    service = await Service.create(newService);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the service fields are missing", done => {
    app()
      .put("/api/service/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToUpdateService);
        done();
      });
  });

  it("rejects requests where the service _id is invalid", done => {
    app()
      .put("/api/service/update")
      .set("Cookie", cookie)
      .send({ ...updatedService, id: "601dc43483adb35b1ca678ea" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateService);
        done();
      });
  });

  it("accepts requests to update a service", done => {
    app()
      .put("/api/service/update")
      .set("Cookie", cookie)
      .send({ ...updatedService, id: service._id })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully updated the services!");
        done();
      });
  });
});
