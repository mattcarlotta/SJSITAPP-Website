import mongoose from "mongoose";
import { connectToDB } from "~database";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Retrieve All Tokens Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve all tokens for pagination", done => {
    app()
      .get("/api/tokens/viewall")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          tokens: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              authorizedEmail: expect.any(String),
              role: expect.any(String),
              token: expect.any(String),
              expiration: expect.any(String)
            })
          ]),
          totalDocs: expect.any(Number)
        });
        done();
      });
  });

  it("accepts requests to retrieve all tokens for pagination by email", done => {
    app()
      .get("/api/tokens/viewall?email=scheduledmember@test.com")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          tokens: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              authorizedEmail: expect.any(String),
              role: expect.any(String),
              token: expect.any(String),
              expiration: expect.any(String)
            })
          ]),
          totalDocs: expect.any(Number)
        });
        done();
      });
  });

  it("accepts requests to retrieve all tokens for pagination by role", done => {
    app()
      .get("/api/tokens/viewall?role=member")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          tokens: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              authorizedEmail: expect.any(String),
              role: expect.any(String),
              token: expect.any(String),
              expiration: expect.any(String)
            })
          ]),
          totalDocs: expect.any(Number)
        });
        done();
      });
  });
});
