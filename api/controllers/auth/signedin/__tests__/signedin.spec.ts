import mongoose from "mongoose";
import { connectToDB } from "~database";
import User, { IUserDocument } from "~models/user";
import { memberSignIn, staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const susendedEmail = "goingtobesuspended@example.com";
const textPassword = "password";

const newUser = {
  email: susendedEmail,
  firstName: "Hello",
  lastName: "Goodbye",
  role: "employee",
  token: "abc2838",
  registered: new Date()
};

describe("Signed In Controller", () => {
  let user: IUserDocument;
  beforeAll(async () => {
    await connectToDB();
    const password = await User.createPassword(textPassword);
    user = await User.create({ ...newUser, password });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the user session is missing", done => {
    app()
      .get("/api/signedin")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ role: "guest" });
        done();
      });
  });

  it("rejects requests where the user has been suspended", async done => {
    const cookie = await memberSignIn(susendedEmail);

    await User.updateOne({ _id: user._id }, { status: "suspended" });

    await app()
      .get("/api/signedin")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ role: "guest" });
        done();
      });
  });

  it("accepts requests where the user session is valid", async done => {
    const cookie = await staffSignIn();

    await app()
      .get("/api/signedin")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          avatar: expect.any(String),
          email: expect.any(String),
          emailReminders: expect.any(Boolean),
          firstName: expect.any(String),
          id: expect.any(String),
          lastName: expect.any(String),
          registered: expect.any(String),
          role: expect.any(String),
          status: expect.any(String)
        });
        done();
      });
  });
});
