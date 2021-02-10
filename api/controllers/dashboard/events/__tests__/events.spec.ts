import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import app from "~test/utils/testServer";

describe("Dashboard Today/Upcoming Event Controller", () => {
  let res: request.Response;
  beforeAll(async () => {
    await connectToDB();
    res = await app()
      .post("/api/signin")
      .send({ email: "scheduledmember@test.com", password: "password" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve today's event", done => {
    app()
      .get("/api/dashboard/events/today")
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.events).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              eventDate: expect.any(String),
              eventType: expect.any(String),
              location: expect.any(String),
              opponent: expect.any(String),
              schedule: expect.arrayContaining([
                expect.objectContaining({
                  _id: expect.any(String),
                  employeeIds: expect.any(Array)
                })
              ]),
              team: expect.any(String),
              uniform: expect.any(String)
            })
          ])
        );
        done();
      });
  });

  it("accepts requests to retrieve any upcoming event", done => {
    app()
      .get("/api/dashboard/events/upcoming")
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.events).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              eventDate: expect.any(String),
              eventType: expect.any(String),
              location: expect.any(String),
              opponent: expect.any(String),
              schedule: expect.arrayContaining([
                expect.objectContaining({
                  _id: expect.any(String),
                  employeeIds: expect.any(Array)
                })
              ]),
              team: expect.any(String),
              uniform: expect.any(String)
            })
          ])
        );
        done();
      });
  });
});
