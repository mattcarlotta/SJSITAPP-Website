import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToDeleteTeam } from "~messages/errors";
import Team, { ITeamDocument } from "~models/team";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newTeam = {
  team: "Snap Team",
  league: "NHL",
  name: "snap-team"
};

describe("Delete Team Controller", () => {
  let cookie: string;
  let team: ITeamDocument;
  beforeAll(async () => {
    await connectToDB();
    team = await Team.create(newTeam);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the team doesn't exist", done => {
    app()
      .delete("/api/team/delete/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToDeleteTeam);
        done();
      });
  });

  it("accepts requests to delete a team", done => {
    app()
      .delete(`/api/team/delete/${team._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the team.");
        done();
      });
  });
});
