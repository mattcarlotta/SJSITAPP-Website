import mongoose from "mongoose";
import { connectToDB } from "~database";
import { missingIds } from "~messages/errors";
import Event, { IEventDocument } from "~models/event";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newEvent = {
  callTimes: [new Date(2001, 8, 1)],
  eventDate: new Date(2001, 8, 1),
  eventType: "Game",
  location: "Any",
  notes: "",
  opponent: "None",
  seasonId: "20002001",
  team: "Yes",
  uniform: "Uniform"
};

const newEvent2 = {
  ...newEvent,
  callTimes: [new Date(2001, 8, 2)],
  eventDate: new Date(2001, 8, 2)
};

describe("Delete Many Events Controller", () => {
  let cookie: string;
  let game1: IEventDocument;
  let game2: IEventDocument;
  beforeAll(async () => {
    await connectToDB();
    game1 = await Event.create(newEvent);
    game2 = await Event.create(newEvent2);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the event ids are missing", done => {
    app()
      .delete("/api/events/delete-many")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingIds);
        done();
      });
  });

  it("accepts requests to delete an event", done => {
    app()
      .delete("/api/events/delete-many")
      .set("Cookie", cookie)
      .send({ ids: [game1._id, game2._id] })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the events.");
        done();
      });
  });
});
