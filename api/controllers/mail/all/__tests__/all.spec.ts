import mongoose from "mongoose";
import { connectToDB } from "~database";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Retrieve All Mail Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve all mail for pagination", done => {
    app()
      .get("/api/mail/viewall")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          mail: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              message: expect.any(String),
              sendTo: expect.any(Array),
              sendFrom: expect.any(String),
              sendDate: expect.any(String),
              status: expect.any(String),
              subject: expect.any(String)
            })
          ]),
          totalDocs: expect.any(Number)
        });
        done();
      });
  });
});
