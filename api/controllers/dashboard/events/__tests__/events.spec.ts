import mongoose from "mongoose";
import { connectToDB } from "~database";
import { memberSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Dashboard Today/Upcoming Event Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await memberSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve today's event", done => {
    app()
      .get("/api/dashboard/events/today")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
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
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
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
