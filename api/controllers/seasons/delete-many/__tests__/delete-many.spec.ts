import mongoose from "mongoose";
import { connectToDB } from "~database";
import { missingIds, unableToDeleteSeasons } from "~messages/errors";
import Season, { ISeasonDocument } from "~models/season";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newSeason = {
  seasonId: "19891990",
  startDate: new Date(1989, 8, 26),
  endDate: new Date(1990, 5, 12)
};

const newSeason2 = {
  seasonId: "19901991",
  startDate: new Date(1990, 8, 26),
  endDate: new Date(1991, 5, 12)
};

describe("Delete Many Seasons Controller", () => {
  let cookie: string;
  let season: ISeasonDocument;
  let season2: ISeasonDocument;
  beforeAll(async () => {
    await connectToDB();
    season = await Season.create(newSeason);
    season2 = await Season.create(newSeason2);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the season ids are missing", done => {
    app()
      .delete("/api/seasons/delete-many")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingIds);
        done();
      });
  });

  it("rejects requests where the season ids are invalid", done => {
    app()
      .delete("/api/seasons/delete-many")
      .send({ ids: ["601dc43483adb35b1ca678ea", "601dc43483adb35b1ca678eb"] })
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToDeleteSeasons);
        done();
      });
  });

  it("accepts requests to delete many seasons", done => {
    app()
      .delete("/api/seasons/delete-many")
      .set("Cookie", cookie)
      .send({ ids: [season._id, season2._id] })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the seasons.");
        done();
      });
  });
});
