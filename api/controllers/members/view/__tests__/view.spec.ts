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

  it("rejects requests where the member id is invalid", done => {
    app()
      .get("/api/members/view/123")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingMemberId);
        done();
      });
  });

  it("rejects requests where the member id is non-existent", done => {
    app()
      .get("/api/members/view/606f28d674c497962d03a144")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateMember);
        done();
      });
  });

  it("accepts requests to retrieve a member profile", done => {
    app()
      .get(`/api/members/view/${user!._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          avatar: expect.any(String),
          email: expect.any(String),
          emailReminders: expect.any(Boolean),
          firstName: expect.any(String),
          lastName: expect.any(String),
          role: expect.any(String),
          registered: expect.any(String),
          status: expect.any(String)
        });
        done();
      });
  });
});
