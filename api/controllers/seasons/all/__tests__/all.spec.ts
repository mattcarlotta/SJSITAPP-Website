import mongoose from "mongoose";
import { connectToDB } from "~database";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Retrieve All Season Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve all seasons for pagination", done => {
    app()
      .get("/api/seasons/viewall")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          docs: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              endDate: expect.any(String),
              seasonId: expect.any(String),
              startDate: expect.any(String)
            })
          ]),
          totalDocs: expect.any(Number)
        });
        done();
      });
  });
});
