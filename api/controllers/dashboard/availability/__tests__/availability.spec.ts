import mongoose from "mongoose";
import { connectToDB } from "~database";
import { memberSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Dashboard Availability Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await memberSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve logged in user availability", done => {
    app()
      .get("/api/dashboard/availability")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              label: expect.any(String),
              value: expect.any(Number)
            })
          ])
        );
        done();
      });
  });
});
