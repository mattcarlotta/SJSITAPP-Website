import mongoose from "mongoose";
import { createConnectionToDatabase } from "~database";
import { badCredentials, invalidStatus } from "~messages/errors";
import app from "~test/utils/testServer";

describe("Sign In Controller", () => {
  let db: mongoose.Connection;
  beforeAll(async () => {
    db = await createConnectionToDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("rejects requests where the email and password is missing", async done => {
    await app()
      .post("/api/signin")
      .expect("Content-Type", /json/)
      .send({ email: "", password: "" })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(badCredentials);
        done();
      });
  });

  it("rejects requests where the email is invalid", async done => {
    await app()
      .post("/api/signin")
      .expect("Content-Type", /json/)
      .send({ email: "bad@email.com", password: "123456" })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(badCredentials);
        done();
      });
  });

  it("rejects requests where the account is suspended", async done => {
    await app()
      .post("/api/signin")
      .expect("Content-Type", /json/)
      .send({ email: "suspended.employee@example.com", password: "password" })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(invalidStatus);
        done();
      });
  });

  it("rejects requests where the password is invalid", async done => {
    await app()
      .post("/api/signin")
      .expect("Content-Type", /json/)
      .send({ email: "staffmember@example.com", password: "invalid" })
      .expect(403)
      .then(res => {
        expect(res.body.err).toEqual(badCredentials);
        done();
      });
  });

  it("accepts requests where the user session is valid", async done => {
    await app()
      .post("/api/signin")
      .expect("Content-Type", /json/)
      .send({ email: "staffmember@example.com", password: "password" })
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          avatar: expect.any(String),
          email: expect.any(String),
          firstName: expect.any(String),
          id: expect.any(String),
          lastName: expect.any(String),
          role: expect.any(String)
        });
        done();
      });
  });
});
