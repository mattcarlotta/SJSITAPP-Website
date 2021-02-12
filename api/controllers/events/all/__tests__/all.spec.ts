import mongoose from "mongoose";
import { connectToDB } from "~database";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Retrieve All Events Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve all events for pagination", done => {
    app()
      .get("/api/events/viewall")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.events).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              callTimes: expect.any(Array),
              employeeResponses: expect.any(Array),
              eventDate: expect.any(String),
              eventType: expect.any(String),
              location: expect.any(String),
              notes: expect.any(String),
              opponent: expect.any(String),
              scheduledIds: expect.any(Array),
              seasonId: expect.any(String),
              sentEmailReminders: expect.any(Boolean),
              team: expect.any(String),
              uniform: expect.any(String)
            })
          ])
        );
        done();
      });
  });

  it("accepts requests to retrieve all events for pagination via query", done => {
    app()
      .get("/api/events/viewall?page=1&team=sharks")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.events).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              callTimes: expect.any(Array),
              employeeResponses: expect.any(Array),
              eventDate: expect.any(String),
              eventType: expect.any(String),
              location: expect.any(String),
              notes: expect.any(String),
              opponent: expect.any(String),
              scheduledIds: expect.any(Array),
              seasonId: expect.any(String),
              sentEmailReminders: expect.any(Boolean),
              team: expect.any(String),
              uniform: expect.any(String)
            })
          ])
        );
        done();
      });
  });
});
