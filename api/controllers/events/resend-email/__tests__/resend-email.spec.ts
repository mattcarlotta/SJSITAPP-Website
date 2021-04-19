import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToLocateEvent } from "~messages/errors";
import { resentEventEmail } from "~messages/success";
import Event, { IEventDocument } from "~models/event";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newEvent = {
  callTimes: [new Date(2001, 4, 1)],
  eventDate: new Date(2001, 4, 1),
  eventType: "Game",
  location: "Any",
  notes: "",
  opponent: "None",
  seasonId: "20002001",
  team: "Yes",
  uniform: "Uniform"
};

describe("Event Resend Email Controller", () => {
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
      .put("/api/events/resend-email/a01dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateEvent);
        done();
      });
  });

  it("accepts requests to resend an event email", done => {
    app()
      .put(`/api/events/resend-email/${game._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(resentEventEmail);
        done();
      });
  });
});
