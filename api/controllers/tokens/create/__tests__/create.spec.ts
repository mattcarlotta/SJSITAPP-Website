import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  emailAssociatedWithKey,
  invalidAuthTokenRequest
} from "~messages/errors";
import app from "~test/utils/testServer";
import { staffSignIn } from "~test/utils/signIn";

const newToken = {
  authorizedEmail: "new.token@test.com",
  role: "member"
};

describe("Create Token Controller", () => {
  let cookie: string;
  beforeAll(async () => {
    await connectToDB();
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the token fields are missing", done => {
    app()
      .post("/api/tokens/create")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(invalidAuthTokenRequest);
        done();
      });
  });

  it("rejects requests where the token email has already been used", done => {
    app()
      .post("/api/tokens/create")
      .set("Cookie", cookie)
      .send({ ...newToken, authorizedEmail: "member@example.com" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(emailAssociatedWithKey);
        done();
      });
  });

  it("accepts requests to create a new token", done => {
    app()
      .post("/api/tokens/create")
      .set("Cookie", cookie)
      .send(newToken)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual(
          `Successfully created and sent an authorization token to ${newToken.authorizedEmail}.`
        );
        done();
      });
  });
});
