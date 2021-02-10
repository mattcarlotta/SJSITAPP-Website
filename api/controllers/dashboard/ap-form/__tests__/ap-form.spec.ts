import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import app from "~test/utils/testServer";

describe("Dashboard AP Form Controller", () => {
  let res: request.Response;
  beforeAll(async () => {
    await connectToDB();
    res = await app()
      .post("/api/signin")
      .send({ email: "scheduledmember@test.com", password: "password" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve AP form information", done => {
    app()
      .get("/api/dashboard/ap-form")
      .set("Cookie", res.header["set-cookie"])
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
