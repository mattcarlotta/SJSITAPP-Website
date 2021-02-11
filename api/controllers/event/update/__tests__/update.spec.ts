import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import {
  invalidUpdateEventRequest,
  mustContainUniqueCallTimes,
  unableToLocateEvent
} from "~messages/errors";
import Event, { IEventDocument } from "~models/event";
import { createDate } from "~helpers";
import app from "~test/utils/testServer";

const today = createDate().format();

const newEvent = {
  callTimes: [today],
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
  let res: request.Response;
  let game: IEventDocument;
  beforeAll(async () => {
    await connectToDB();
    const createdEvent = await Event.create(newEvent);
    game = await Event.findOne({ _id: createdEvent._id }).lean();
    res = await app()
      .post("/api/signin")
      .send({ email: "staffmember@example.com", password: "password" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the event properties are missing", done => {
    app()
      .put("/api/event/update")
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(invalidUpdateEventRequest);
        done();
      });
  });

  it("rejects requests where the callTimes aren't unique", done => {
    const today = createDate().format();
    app()
      .put("/api/event/update")
      .set("Cookie", res.header["set-cookie"])
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
      .put("/api/event/update")
      .set("Cookie", res.header["set-cookie"])
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
      .put("/api/event/update")
      .set("Cookie", res.header["set-cookie"])
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
      .put("/api/event/update")
      .set("Cookie", res.header["set-cookie"])
      .send({
        ...game,
        eventType: "Game"
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully updated the event.");
        done();
      });
  });
});