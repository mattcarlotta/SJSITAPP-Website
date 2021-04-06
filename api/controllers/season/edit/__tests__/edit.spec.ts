import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToLocateSeason } from "~messages/errors";
import Season, { ISeasonDocument } from "~models/season";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newSeason = {
  seasonId: "20102011",
  startDate: new Date(2010, 8, 26),
  endDate: new Date(20011, 5, 12)
};

describe("Edit Season Controller", () => {
  let cookie: string;
  let season: ISeasonDocument;
  beforeAll(async () => {
    await connectToDB();
    season = await Season.create(newSeason);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the season id is invalid", done => {
    app()
      .get("/api/season/edit/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateSeason);
        done();
      });
  });

  it("accepts requests to edit a season", done => {
    app()
      .get(`/api/season/edit/${season._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          endDate: expect.any(String),
          startDate: expect.any(String),
          seasonId: expect.any(String)
        });
        done();
      });
  });
});
