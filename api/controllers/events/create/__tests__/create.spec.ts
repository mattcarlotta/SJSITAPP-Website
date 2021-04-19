import mongoose from "mongoose";
import { connectToDB } from "~database";
import { Season } from "~models";
import {
  invalidCreateEventRequest,
  invalidEventDate,
  mustContainUniqueCallTimes,
  unableToLocateSeason
} from "~messages/errors";
import { createDate, moment } from "~helpers";
import app from "~test/utils/testServer";
import { staffSignIn } from "~test/utils/signIn";

const newEvent = {
  callTimes: [new Date(2001, 1, 1)],
  eventDate: new Date(2001, 1, 1),
  eventType: "Game",
  location: "Any",
  notes: "",
  opponent: "None",
  seasonId: "20002001",
  team: "Yes",
  uniform: "Uniform"
};

describe("Create Event Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the event fields are missing", done => {
    app()
      .post("/api/events/create")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(invalidCreateEventRequest);
        done();
      });
  });

  it("rejects requests where the callTimes aren't unique", done => {
    const today = createDate().format();
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

  it("rejects requests where the seasonId is invalid", done => {
    app()
      .post("/api/events/create")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({ ...newEvent, seasonId: "18001801" })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateSeason);
        done();
      });
  });

  it("rejects requests where the event date falls outside of the season", async done => {
    const seasonExists = await Season.findOne({ seasonId: newEvent.seasonId });

    const seasonStart = moment(seasonExists?.startDate, "L").format("L");
    const seasonEnd = moment(seasonExists?.endDate, "L").format("L");

    await app()
      .post("/api/events/create")
      .set("Cookie", cookie)
      .send({ ...newEvent, eventDate: new Date(1800, 1, 1) })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(
          invalidEventDate(seasonExists!.seasonId, seasonStart, seasonEnd)
        );
        done();
      });
  });

  it("accepts requests to create an event", done => {
    app()
      .post("/api/events/create")
      .set("Cookie", cookie)
      .send(newEvent)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual(
          `Successfully added a new event to the ${newEvent.seasonId} season.`
        );
        done();
      });
  });
});
