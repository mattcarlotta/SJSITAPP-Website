import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToLocateEvent } from "~messages/errors";
import Event, { IEventDocument } from "~models/event";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newEvent = {
  callTimes: [new Date(2001, 3, 1)],
  eventDate: new Date(2001, 3, 1),
  eventType: "Game",
  location: "Any",
  notes: "",
  opponent: "None",
  seasonId: "20002001",
  team: "Yes",
  uniform: "Uniform"
};

describe("Edit Event Controller", () => {
  let cookie: string;
  let game: IEventDocument;
  beforeAll(async () => {
    await connectToDB();
    game = await Event.create(newEvent);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the event id is invalid", done => {
    app()
      .get("/api/event/edit/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateEvent);
        done();
      });
  });

  it("accepts requests to retrieve an event for editing", done => {
    app()
      .get(`/api/event/edit/${game._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.event).toEqual({
          _id: expect.any(String),
          callTimes: expect.any(Array),
          employeeResponses: expect.any(Array),
          eventDate: expect.any(String),
          eventType: expect.any(String),
          location: expect.any(String),
          notes: expect.any(String),
          opponent: expect.any(String),
          schedule: expect.any(Array),
          scheduledIds: expect.any(Array),
          seasonId: expect.any(String),
          sentEmailReminders: expect.any(Boolean),
          team: expect.any(String),
          uniform: expect.any(String)
        });
        done();
      });
  });
});
