import mongoose from "mongoose";
import { connectToDB } from "~database";
import { missingMemberId, unableToLocateMember } from "~messages/errors";
import User, { IUserDocument } from "~models/user";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Member Events Controller", () => {
  let cookie: string;
  let user: IUserDocument | null;
  beforeAll(async () => {
    await connectToDB();
    user = await User.findOne({ email: "scheduledmember@test.com" });
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the member id is missing", done => {
    app()
      .get("/api/members/events")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingMemberId);
        done();
      });
  });

  it("rejects requests where the member id is invalid", done => {
    app()
      .get("/api/members/events?id=601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateMember);
        done();
      });
  });

  it("accepts requests to retrieve an event for scheduling", done => {
    app()
      .get(`/api/members/events?id=${user!._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.eventResponses).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              employeeNotes: expect.any(String),
              employeeResponse: expect.any(String),
              eventDate: expect.any(String),
              eventNotes: expect.any(String),
              eventType: expect.any(String),
              location: expect.any(String),
              opponent: expect.any(String),
              team: expect.any(String)
            })
          ])
        );
        done();
      });
  });
});
