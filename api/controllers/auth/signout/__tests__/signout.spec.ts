import mongoose from "mongoose";
import { createConnectionToDatabase } from "~database";
import app from "~test/utils/testServer";

describe("Sign Out Controller", () => {
  let db: mongoose.Connection;
  beforeAll(async () => {
    db = await createConnectionToDatabase();
  });

  afterAll(async () => {
    await db.close();
  });

  it("accepts requests to remove a user session", done => {
    app().get("/api/signout").expect("Content-Type", /json/).expect(200, done);
  });
});
