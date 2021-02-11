import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import { unableToLocateEvent } from "~messages/errors";
import Event, { IEventDocument } from "~models/event";
import app from "~test/utils/testServer";

const newEvent = {
  callTimes: [new Date(2001, 2, 1)],
  eventDate: new Date(2001, 2, 1),
  eventType: "Game",
  location: "Any",
  notes: "",
  opponent: "None",
  seasonId: "20002001",
  team: "Yes",
  uniform: "Uniform"
};

describe("Delete Event Controller", () => {
  let res: request.Response;
  let game: IEventDocument;
  beforeAll(async () => {
    await connectToDB();
    game = await Event.create(newEvent);
    res = await app()
      .post("/api/signin")
      .send({ email: "staffmember@example.com", password: "password" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the event id is invalid", done => {
    app()
      .delete("/api/event/delete/601dc43483adb35b1ca678ea")
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateEvent);
        done();
      });
  });

  it("accepts requests to delete an event", done => {
    app()
      .delete(`/api/event/delete/${game._id}`)
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the event.");
        done();
      });
  });
});