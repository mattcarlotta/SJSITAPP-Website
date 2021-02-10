import mongoose from "mongoose";
import { connectToDB } from "~database";
import User, { IUserDocument } from "~models/user";
import app from "~test/utils/testServer";

const email = "staffmember@example.com";
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
    const res = await app()
      .post("/api/signin")
      .send({ email: susendedEmail, password: textPassword });

    await User.updateOne({ _id: user._id }, { status: "suspended" });

    await app()
      .get("/api/signedin")
      .expect("Content-Type", /json/)
      .set("Cookie", res.header["set-cookie"])
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({ role: "guest" });
        done();
      });
  });

  it("accepts requests where the user session is valid", async done => {
    const res = await app()
      .post("/api/signin")
      .send({ email, password: "password" });

    await app()
      .get("/api/signedin")
      .expect("Content-Type", /json/)
      .set("Cookie", res.header["set-cookie"])
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          avatar: expect.any(String),
          email: expect.any(String),
          firstName: expect.any(String),
          id: expect.any(String),
          lastName: expect.any(String),
          role: expect.any(String)
        });
        done();
      });
  });
});
