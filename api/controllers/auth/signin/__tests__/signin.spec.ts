import mongoose from "mongoose";
import { connectToDB } from "~database";
import { badCredentials, invalidStatus } from "~messages/errors";
import app from "~test/utils/testServer";

describe("Sign In Controller", () => {
  beforeAll(async () => {
    await connectToDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the email and password is missing", done => {
    app()
      .post("/api/signin")
      .expect("Content-Type", /json/)
      .send({ email: "", password: "" })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(badCredentials);
        done();
      });
  });

  it("rejects requests where the email is invalid", done => {
    app()
      .post("/api/signin")
      .expect("Content-Type", /json/)
      .send({ email: "bad@email.com", password: "123456" })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(badCredentials);
        done();
      });
  });

  it("rejects requests where the account is suspended", done => {
    app()
      .post("/api/signin")
      .expect("Content-Type", /json/)
      .send({ email: "suspended.employee@example.com", password: "password" })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(invalidStatus);
        done();
      });
  });

  it("rejects requests where the password is invalid", done => {
    app()
      .post("/api/signin")
      .expect("Content-Type", /json/)
      .send({ email: "staffmember@example.com", password: "invalid" })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(badCredentials);
        done();
      });
  });

  it("accepts requests where the user session is valid", done => {
    app()
      .post("/api/signin")
      .expect("Content-Type", /json/)
      .send({ email: "staffmember@example.com", password: "password" })
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          avatar: expect.any(String),
          email: expect.any(String),
          emailReminders: expect.any(Boolean),
          firstName: expect.any(String),
          id: expect.any(String),
          lastName: expect.any(String),
          registered: expect.any(String),
          role: expect.any(String),
          status: expect.any(String)
        });
        done();
      });
  });
});
