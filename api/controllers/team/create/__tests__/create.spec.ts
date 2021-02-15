import mongoose from "mongoose";
import { connectToDB } from "~database";
import { teamAlreadyExists, unableToCreateTeam } from "~messages/errors";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newTeam = {
  team: "Example",
  league: "NHL",
  name: "example"
};

describe("Create Team Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the create team fields are missing", done => {
    app()
      .post("/api/team/create")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToCreateTeam);
        done();
      });
  });

  it("rejects requests where the team already exists", done => {
    app()
      .post("/api/team/create")
      .set("Cookie", cookie)
      .send({ ...newTeam, team: "San Jose Sharks" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(teamAlreadyExists);
        done();
      });
  });

  it("accepts requests to create a team", done => {
    app()
      .post("/api/team/create")
      .set("Cookie", cookie)
      .send(newTeam)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual(
          `Successfully added the ${newTeam.team} to the ${newTeam.league}.`
        );
        done();
      });
  });
});
