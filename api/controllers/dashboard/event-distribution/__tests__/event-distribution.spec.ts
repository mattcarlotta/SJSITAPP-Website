import mongoose from "mongoose";
import request from "supertest";
import { connectToDB } from "~database";
import { createDate, getMonthDateRange, moment } from "~helpers";
import { missingDates } from "~messages/errors";
import app from "~test/utils/testServer";

const format = "MM/DD/YYYY";

describe("Dashboard Event Distribution Controller", () => {
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

  it("rejects requests without start and end month dates", done => {
    app()
      .get("/api/dashboard/event-distribution")
      .expect("Content-Type", /json/)
      .set("Cookie", res.header["set-cookie"])
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingDates);
        done();
      });
  });

  it("accepts requests to retrieve empty event distribution count for the select dates", done => {
    const startDate = moment(new Date(3000, 1, 1), format).format(format);
    const endDate = moment(new Date(3000, 31, 1), format).format(format);

    app()
      .get(
        `/api/dashboard/event-distribution?startDate=${startDate}&endDate=${endDate}`
      )
      .expect("Content-Type", /json/)
      .set("Cookie", res.header["set-cookie"])
      .expect(200)
      .then(res => {
        expect(res.body.members).toEqual([]);
        done();
      });
  });

  it("accepts requests to retrieve event distribution count for the select dates", done => {
    const { startOfMonth: startDate, endOfMonth: endDate } = getMonthDateRange(
      createDate().toDate()
    );

    app()
      .get(
        `/api/dashboard/event-distribution?startDate=${startDate.format(
          format
        )}&endDate=${endDate.format(format)}`
      )
      .expect("Content-Type", /json/)
      .set("Cookie", res.header["set-cookie"])
      .expect(200)
      .then(res => {
        expect(res.body.members).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              "Event Count": expect.any(Number)
            })
          ])
        );
        done();
      });
  });
});
