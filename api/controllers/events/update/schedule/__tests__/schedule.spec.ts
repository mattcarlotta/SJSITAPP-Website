import mongoose from "mongoose";
import { connectToDB } from "~database";
import {
  invalidUpdateEventRequest,
  unableToLocateEvent
} from "~messages/errors";
import Event, { IEventDocument } from "~models/event";
import User, { IUserDocument } from "~models/user";
import { moment } from "~helpers";
import app from "~test/utils/testServer";
import { staffSignIn } from "~test/utils/signIn";

const newEvent = {
  callTimes: ["2001-05-31T17:30:00-07:00"],
  eventDate: new Date(2001, 6, 1),
  eventType: "Game",
  location: "Any",
  notes: "",
  opponent: "None",
  seasonId: "20002001",
  team: "Yes",
  uniform: "Uniform"
};

describe("Event Update Schedule Controller", () => {
  let cookie: string;
  let game: IEventDocument;
  let user: IUserDocument | null;
  let schedule: any;
  beforeAll(async () => {
    await connectToDB();
    game = await Event.create(newEvent);
    user = await User.findOne({
      email: "carlotta.matthew@gmail.com"
    });
    schedule = [
      {
        _id: moment("2001-05-31T17:30:00-07:00").format(),
        employeeIds: []
      }
    ];
    cookie = await staffSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the event id and schedule are missing", done => {
    app()
      .put("/api/events/update/schedule")
      .set("Cookie", cookie)
      .send({ id: "", schedule: [] })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(invalidUpdateEventRequest);
        done();
      });
  });

  it("rejects requests where the event id is invalid", done => {
    app()
      .put("/api/events/update/schedule")
      .set("Cookie", cookie)
      .send({ id: "601dc43483adb35b1ca678ea", schedule })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateEvent);
        done();
      });
  });

  it("accepts requests to update an event's scheduled ids", done => {
    app()
      .put("/api/events/update/schedule")
      .set("Cookie", cookie)
      .send({
        id: game._id,
        schedule: [
          { _id: game.callTimes[0], title: "Ok", employeeIds: [user!.id] }
        ]
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual(
          "Successfully updated the event's schedule."
        );
        done();
      });
  });
});
