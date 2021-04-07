import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  seasonAlreadyExists,
  unableToLocateSeason,
  unableToUpdateSeason
} from "~messages/errors";
import Season, { ISeasonDocument } from "~models/season";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newSeason = {
  seasonId: "20132014",
  startDate: new Date(2013, 8, 26),
  endDate: new Date(2014, 5, 12)
};

const updatedSeason = {
  seasonId: "20142015",
  startDate: new Date(2014, 8, 26),
  endDate: new Date(2015, 5, 12)
};

describe("Update Season Controller", () => {
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

  it("rejects requests where the season _id, seasonId, seasonDuration are missing", done => {
    app()
      .put("/api/seasons/update")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToUpdateSeason);
        done();
      });
  });

  it("rejects requests where the season _id is invalid", done => {
    app()
      .put("/api/seasons/update")
      .set("Cookie", cookie)
      .send({ ...updatedSeason, id: "601dc43483adb35b1ca678ea" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateSeason);
        done();
      });
  });

  it("rejects requests where the season are exists", done => {
    app()
      .put("/api/seasons/update")
      .set("Cookie", cookie)
      .send({ ...updatedSeason, id: season._id, seasonId: "20002001" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(seasonAlreadyExists);
        done();
      });
  });

  it("accepts requests to update a season", done => {
    app()
      .put("/api/seasons/update")
      .set("Cookie", cookie)
      .send({ ...updatedSeason, id: season._id })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully updated the season.");
        done();
      });
  });

  it("accepts requests to update a season duration", done => {
    app()
      .put("/api/seasons/update")
      .set("Cookie", cookie)
      .send({
        ...updatedSeason,
        seasonDuration: [new Date(2014, 9, 26), new Date(2015, 6, 12)],
        id: season._id
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully updated the season.");
        done();
      });
  });
});
