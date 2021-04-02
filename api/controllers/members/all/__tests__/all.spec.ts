import mongoose from "mongoose";
import { connectToDB } from "~database";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Retrieve All Members Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve all members for pagination", done => {
    app()
      .get("/api/members/viewall")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          members: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              role: expect.any(String),
              status: expect.any(String),
              registered: expect.any(String),
              email: expect.any(String),
              emailReminders: expect.any(Boolean),
              firstName: expect.any(String),
              lastName: expect.any(String)
            })
          ]),
          totalDocs: expect.any(Number)
        });
        done();
      });
  });

  it("accepts requests to retrieve all employees for pagination", done => {
    app()
      .get("/api/members/viewall?role=member")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          members: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              role: expect.any(String),
              status: expect.any(String),
              registered: expect.any(String),
              email: expect.any(String),
              emailReminders: expect.any(Boolean),
              firstName: expect.any(String),
              lastName: expect.any(String)
            })
          ]),
          totalDocs: expect.any(Number)
        });
        done();
      });
  });
});
