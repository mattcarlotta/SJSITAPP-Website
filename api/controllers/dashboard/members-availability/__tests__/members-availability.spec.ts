import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import app from "~test/utils/testServer";

describe("Dashboard Overall Availability Controller", () => {
  let res: request.Response;
  beforeAll(async () => {
    await connectToDB();
    res = await app()
      .post("/api/signin")
      .send({ email: "staffmember@example.com", password: "password" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve overall users' availabilities", done => {
    app()
      .get("/api/dashboard/members-availability")
      .set("Cookie", res.header["set-cookie"])
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
