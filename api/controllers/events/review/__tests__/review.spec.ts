import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToLocateEvent } from "~messages/errors";
import Event, { IEventDocument } from "~models/event";
import { moment } from "~helpers";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newEvent = {
  callTimes: [moment("05-01-2001 05:00pm", "MM-DD-YYYY hh:mma").format()],
  eventDate: new Date(2001, 5, 1),
  eventType: "Game",
  location: "Any",
  notes: "",
  opponent: "None",
  seasonId: "20002001",
  team: "Yes",
  uniform: "Uniform"
};

describe("Review Event Controller", () => {
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
      .get("/api/events/review/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateEvent);
        done();
      });
  });

  it("accepts requests to retrieve an event for scheduling", done => {
    app()
      .get(`/api/events/review/${game._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          columns: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              title: expect.any(String),
              employeeIds: expect.arrayContaining([expect.any(String)])
            })
          ]),
          event: expect.objectContaining({
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
          }),
          users: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              avatar: expect.any(String),
              firstName: expect.any(String),
              lastName: expect.any(String),
              notes: expect.any(String),
              response: expect.any(String)
            })
          ])
        });
        done();
      });
  });
});
