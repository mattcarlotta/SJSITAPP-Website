import mongoose from "mongoose";
import { connectToDB } from "~database";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Dashboard Overall Availability Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve overall users' availabilities", done => {
    app()
      .get("/api/dashboard/members-availability")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          membersAvailability: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              availability: expect.any(Number)
            })
          ]),
          months: expect.arrayContaining([expect.any(String)])
        });
        done();
      });
  });
});
