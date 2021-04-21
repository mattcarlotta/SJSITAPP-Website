import mongoose from "mongoose";
import { connectToDB } from "~database";
import { memberSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Member Settings Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await memberSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve logged in user settings", done => {
    app()
      .get("/api/members/settings")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.member).toEqual({
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
