import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import app from "~test/utils/testServer";

describe("Retrieve All Forms Controller", () => {
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

  it("accepts requests to retrieve all forms for pagination", done => {
    app()
      .get("/api/forms/viewall")
      .set("Cookie", res.header["set-cookie"])
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.forms).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              endMonth: expect.any(String),
              expirationDate: expect.any(String),
              sentEmails: expect.any(Boolean),
              startMonth: expect.any(String)
            })
          ])
        );
        done();
      });
  });
});
