import mongoose from "mongoose";
import { connectToDB } from "~database";
import { memberSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Dashboard AP Form Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await memberSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve AP form information", done => {
    app()
      .get("/api/dashboard/ap-form")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.apform).toEqual({
          _id: expect.any(String),
          endMonth: expect.any(String),
          eventCounts: expect.any(Number),
          expirationDate: expect.any(String),
          startMonth: expect.any(String)
        });
        done();
      });
  });
});
