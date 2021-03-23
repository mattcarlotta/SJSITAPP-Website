import mongoose from "mongoose";
import { connectToDB } from "~database";
import { memberSignIn, staffSignIn } from "~test/utils/signIn";
import User, { IUserDocument } from "~models/user";
import { unableToLocateMember } from "~messages/errors";
import app from "~test/utils/testServer";

describe("Event Availability Controller", () => {
  let member: IUserDocument | null;
  let memberCookie: string;
  let staffCookie: string;
  beforeAll(async () => {
    await connectToDB();
    memberCookie = await memberSignIn();
    staffCookie = await staffSignIn();
    member = await User.findOne({ email: "scheduledmember@test.com" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve logged in user availability", done => {
    app()
      .get("/api/events/availability")
      .set("Cookie", memberCookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          eventAvailability: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              value: expect.any(Number)
            })
          ]),
          memberResponseCount: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              value: expect.any(Number)
            })
          ]),
          memberScheduleEvents: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              events: expect.any(Number)
            })
          ])
        });
        done();
      });
  });

  it("accepts requests to retrieve a specfic user's availability", done => {
    app()
      .get(`/api/events/availability?id=${member!.id}`)
      .set("Cookie", staffCookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          eventAvailability: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              value: expect.any(Number)
            })
          ]),
          memberResponseCount: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              value: expect.any(Number)
            })
          ]),
          memberScheduleEvents: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              events: expect.any(Number)
            })
          ])
        });
        done();
      });
  });

  it("rejects requests to retrieve an invalid user's availability", done => {
    app()
      .get("/api/events/availability?id=601dc43483adb35b1ca678ea")
      .set("Cookie", staffCookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateMember);
        done();
      });
  });

  it("accepts requests to retrieve a specfic user's availability", done => {
    app()
      .get(`/api/events/availability?id=${member!.id}`)
      .set("Cookie", staffCookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          eventAvailability: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              value: expect.any(Number)
            })
          ]),
          memberResponseCount: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              value: expect.any(Number)
            })
          ]),
          memberScheduleEvents: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              events: expect.any(Number)
            })
          ])
        });
        done();
      });
  });

  it("accepts requests to retrieve a specfic user's availability by date", done => {
    app()
      .get(
        `/api/events/availability?id=${
          member!._id
        }&selectedDate=1000-06-01T07:00:00.000Z`
      )
      .set("Cookie", staffCookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({});
        done();
      });
  });
});
