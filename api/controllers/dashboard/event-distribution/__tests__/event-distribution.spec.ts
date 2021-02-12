import mongoose from "mongoose";
import { connectToDB } from "~database";
import { createDate, getMonthDateRange, moment } from "~helpers";
import { missingDates } from "~messages/errors";
import { memberSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const format = "MM/DD/YYYY";

describe("Dashboard Event Distribution Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await memberSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests without start and end month dates", done => {
    app()
      .get("/api/dashboard/event-distribution")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
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
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
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
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
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
