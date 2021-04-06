import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToCreateNewSeason, seasonAlreadyExists } from "~messages/errors";
import app from "~test/utils/testServer";
import { staffSignIn } from "~test/utils/signIn";

const newSeason = {
  seasonId: "20022003",
  startDate: new Date(2002, 8, 26),
  endDate: new Date(2003, 5, 12)
};

describe("Create Season Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the season fields are missing", done => {
    app()
      .post("/api/season/create")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToCreateNewSeason);
        done();
      });
  });

  it("rejects requests where the season id is already created", done => {
    app()
      .post("/api/season/create")
      .set("Cookie", cookie)
      .send({ ...newSeason, seasonId: "20002001" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(seasonAlreadyExists);
        done();
      });
  });

  it("accepts requests to create a new season", done => {
    app()
      .post("/api/season/create")
      .set("Cookie", cookie)
      .send(newSeason)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual("Successfully created a new season!");
        done();
      });
  });
});
