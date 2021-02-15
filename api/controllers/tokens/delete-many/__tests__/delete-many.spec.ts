import mongoose from "mongoose";
import { connectToDB } from "~database";
import { missingIds } from "~messages/errors";
import Token, { ITokenDocument } from "~models/token";
import { createSignupToken } from "~helpers";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newToken = {
  authorizedEmail: "delete.many.tokens1@test.com",
  role: "employee",
  expiration: new Date(),
  token: createSignupToken()
};

const newToken2 = {
  authorizedEmail: "delete.many.tokens2@test.com",
  role: "employee",
  expiration: new Date(),
  token: createSignupToken()
};

describe("Delete Many Tokens Controller", () => {
  let cookie: string;
  let token: ITokenDocument;
  let token2: ITokenDocument;
  beforeAll(async () => {
    await connectToDB();
    token = await Token.create(newToken);
    token2 = await Token.create(newToken2);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the token ids are missing", done => {
    app()
      .delete("/api/tokens/delete-many")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(missingIds);
        done();
      });
  });

  it("accepts requests to delete many tokens", done => {
    app()
      .delete("/api/tokens/delete-many")
      .set("Cookie", cookie)
      .send({ ids: [token._id, token2._id] })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          "Successfully deleted the authorization keys."
        );
        done();
      });
  });
});
