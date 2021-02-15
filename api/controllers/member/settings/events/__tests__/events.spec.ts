import mongoose from "mongoose";
import { connectToDB } from "~database";
import { memberSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Member Setttings Event Responses Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await memberSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("accepts requests to retrieve member event responses for settings", done => {
    app()
      .get(`/api/member/settings/events`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.eventResponses).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              employeeNotes: expect.any(String),
              employeeResponse: expect.any(String),
              eventDate: expect.any(String),
              eventNotes: expect.any(String),
              eventType: expect.any(String),
              location: expect.any(String),
              opponent: expect.any(String),
              team: expect.any(String)
            })
          ])
        );
        done();
      });
  });
});
