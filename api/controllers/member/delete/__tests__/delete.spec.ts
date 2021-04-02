import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToDeleteMember } from "~messages/errors";
import User, { IUserDocument } from "~models/user";
import { createRandomToken } from "~helpers";
import { staffSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

const newUser = {
  email: "delete.user@example.com",
  password: "password",
  firstName: "delete",
  lastName: "user",
  role: "member",
  token: createRandomToken(),
  emailReminders: true,
  registered: Date.now()
};

describe("Delete Member Controller", () => {
  let cookie: string;
  let user: IUserDocument;
  beforeAll(async () => {
    await connectToDB();
    user = await User.create(newUser);
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the member id is invalid", done => {
    app()
      .delete("/api/member/delete/601dc43483adb35b1ca678ea")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToDeleteMember);
        done();
      });
  });

  it("accepts requests to delete an member", done => {
    app()
      .delete(`/api/member/delete/${user._id}`)
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("Successfully deleted the member.");
        done();
      });
  });
});
