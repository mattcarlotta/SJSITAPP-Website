import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  invalidUpdateEventRequest,
  mustContainUniqueCallTimes,
  unableToLocateEvent,
  unableToLocateSeason
} from "~messages/errors";
import Event, { IEventDocument } from "~models/event";
import { moment } from "~helpers";
import app from "~test/utils/testServer";
import { staffSignIn } from "~test/utils/signIn";

const today = moment().format();
const currentYear = moment().format("YYYY");
const nextYear = moment().add(1, "year").format("YYYY");
const seasonId = `${currentYear}${nextYear}`;

const newEvent = {
  callTimes: [moment("06-01-2001 05:00pm", "MM-DD-YYYY hh:mma").format()],
  eventDate: new Date(parseInt(currentYear, 10), 7, 1),
  eventType: "Game",
  location: "Any",
  notes: "",
  opponent: "None",
  seasonId,
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
      .send({ ...updatedEvent, id: game._id, callTimes: [today, today] })
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
      .send({ ...updatedEvent, id: "601dc43483adb35b1ca678ea" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateEvent);
        done();
      });
  });

  it("rejects requests where the seasonId is invalid", done => {
    app()
      .put("/api/events/update")
      .set("Cookie", cookie)
      .send({ ...updatedEvent, id: game._id, seasonId: "18001801" })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateSeason);
        done();
      });
  });

  it("rejects requests where the eventDate falls outside of the season", done => {
    app()
      .put("/api/events/update")
      .set("Cookie", cookie)
      .send({ ...updatedEvent, id: game._id, eventDate: new Date(1800, 7, 1) })
      .expect(400)
      .then(res => {
        expect(res.body.err).toContain(
          `The event date selected below falls outside of the ${seasonId} season.`
        );
        done();
      });
  });

  it("rejects requests where the callTimes aren't unique", done => {
    app()
      .post("/api/events/create")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ ...newEvent, callTimes: [today, today] })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(mustContainUniqueCallTimes);
        done();
      });
  });

  it("accepts requests to updates an event, but keeps the schedule intact", done => {
    app()
      .put("/api/events/update")
      .set("Cookie", cookie)
      .send({ ...updatedEvent, id: game._id })
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
        id: game._id,
        callTimes: [today]
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          "Successfully updated the event. Please note that the call times were changed; therefore, any previous scheduling for the event has been removed and will need to be rescheduled."
        );
        done();
      });
  });
});
