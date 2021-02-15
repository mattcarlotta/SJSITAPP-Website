import mongoose from "mongoose";
import { connectToDB } from "~database";
import { missingIds } from "~messages/errors";
import Team, { ITeamDocument } from "~models/team";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newTeam = {
  team: "Team1",
  league: "NHL",
  name: "team1"
};

const newTeam2 = {
  team: "Team2",
  league: "NHL",
  name: "team2"
};

describe("Delete Many Teams Controller", () => {
  let cookie: string;
  let team: ITeamDocument;
  let team2: ITeamDocument;
  beforeAll(async () => {
    await connectToDB();
    team = await Team.create(newTeam);
    team2 = await Team.create(newTeam2);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the team ids are missing", done => {
    app()
      .delete("/api/teams/delete-many")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingIds);
        done();
      });
  });

  it("accepts requests to delete many teams", done => {
    app()
      .delete("/api/teams/delete-many")
      .set("Cookie", cookie)
      .send({ ids: [team._id, team2._id] })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the teams.");
        done();
      });
  });
});
