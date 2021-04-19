import mongoose from "mongoose";
import { connectToDB } from "~database";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Retrieve All Team Names Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve all team names", done => {
    app()
      .get("/api/teams/all")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          names: expect.arrayContaining([expect.any(String)])
        });
        done();
      });
  });
});
