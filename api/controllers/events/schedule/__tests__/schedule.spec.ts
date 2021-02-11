import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import User, { IUserDocument } from "~models/user";
import app from "~test/utils/testServer";

describe("Retrieve All Events For Schedule Controller", () => {
  let res: request.Response;
  let user: IUserDocument | null;
  beforeAll(async () => {
    await connectToDB();
    user = await User.findOne({ email: "scheduledmember@test.com" });
    res = await app()
      .post("/api/signin")
      .send({ email: "staffmember@example.com", password: "password" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve all events for the month", done => {
    app()
      .get("/api/events/schedule")
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
              notes: expect.any(String),
              opponent: expect.any(String),
              scheduledIds: expect.any(Array),
              schedule: expect.any(Array),
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
      .get(`/api/events/schedule?id=${user!._id}&selectedGames=My+Games`)
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
              notes: expect.any(String),
              opponent: expect.any(String),
              scheduledIds: expect.any(Array),
              schedule: expect.any(Array),
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
