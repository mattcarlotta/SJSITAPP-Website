import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import app from "~test/utils/testServer";

describe("Retrieve All Events Controller", () => {
  let res: request.Response;
  beforeAll(async () => {
    await connectToDB();
    res = await app()
      .post("/api/signin")
      .send({ email: "staffmember@example.com", password: "password" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve all events for pagination", done => {
    app()
      .get("/api/events/viewall")
      .set("Cookie", res.header["set-cookie"])
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
      .set("Cookie", res.header["set-cookie"])
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
