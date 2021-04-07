import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToDeleteSeason } from "~messages/errors";
import Season, { ISeasonDocument } from "~models/season";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newSeason = {
  seasonId: "20082009",
  startDate: new Date(2008, 8, 26),
  endDate: new Date(2009, 5, 12)
};

describe("Delete Season Controller", () => {
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
      .delete("/api/seasons/delete/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToDeleteSeason);
        done();
      });
  });

  it("accepts requests to delete a season", done => {
    app()
      .delete(`/api/seasons/delete/${season._id}`)
      .set("Cookie", cookie)
      .send(newSeason)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the season.");
        done();
      });
  });
});
