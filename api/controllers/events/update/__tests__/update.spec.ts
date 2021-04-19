import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  invalidUpdateEventRequest,
  mustContainUniqueCallTimes,
  unableToLocateEvent
} from "~messages/errors";
import Event, { IEventDocument } from "~models/event";
import { createDate } from "~helpers";
import app from "~test/utils/testServer";
import { staffSignIn } from "~test/utils/signIn";

const today = createDate().format();

const newEvent = {
  callTimes: ["2001-06-01T02:00:00.000+00:00"],
  eventDate: new Date(2001, 7, 1),
  eventType: "Game",
  location: "Any",
  notes: "",
  opponent: "None",
  seasonId: "20002001",
  team: "Yes",
  uniform: "Uniform"
};

const updatedEvent = {
  ...newEvent,
  eventType: "Other"
};

describe("Event Update Controller", () => {
  let cookie: string;
  let game: IEventDocument;
  beforeAll(async () => {
    await connectToDB();
    const createdEvent = await Event.create(newEvent);
    game = await Event.findOne({ _id: createdEvent._id }).lean();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the event properties are missing", done => {
    app()
      .put("/api/events/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(invalidUpdateEventRequest);
        done();
      });
  });

  it("rejects requests where the callTimes aren't unique", done => {
    app()
      .put("/api/events/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ ...updatedEvent, _id: game._id, callTimes: [today, today] })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(mustContainUniqueCallTimes);
        done();
      });
  });

  it("rejects requests where the event id property is invalid", done => {
    app()
      .put("/api/events/update")
      .set("Cookie", cookie)
      .send({ ...updatedEvent, _id: "601dc43483adb35b1ca678ea" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateEvent);
        done();
      });
  });

  it("accepts requests to updates an event, but keeps the schedule intact", done => {
    app()
      .put("/api/events/update")
      .set("Cookie", cookie)
      .send({ ...updatedEvent, _id: game._id })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully updated the event.");
        done();
      });
  });

  it("accepts requests to update an event, but overrides the schedule", done => {
    app()
      .put("/api/events/update")
      .set("Cookie", cookie)
      .send({
        ...game,
        callTimes: [today]
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully updated the event.");
        done();
      });
  });
});
