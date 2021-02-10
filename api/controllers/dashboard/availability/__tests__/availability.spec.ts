import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import app from "~test/utils/testServer";

describe("Dashboard Availability Controller", () => {
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

  it("accepts requests to set new passwords", done => {
    app()
      .get("/api/dashboard/availability")
      .expect("Content-Type", /json/)
      .set("Cookie", res.header["set-cookie"])
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          eventAvailability: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              label: expect.any(String),
              value: expect.any(Number)
            })
          ]),
          months: expect.arrayContaining([expect.any(String)])
        });
        done();
      });
  });
});
