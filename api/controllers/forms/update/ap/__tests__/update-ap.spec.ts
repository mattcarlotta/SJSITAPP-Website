import mongoose from "mongoose";
import { connectToDB } from "~database";
import { unableToLocateForm, unableToUpdateApForm } from "~messages/errors";
import Event, { TEventResponse } from "~models/event";
import Form, { IFormDocument } from "~models/form";
import { moment } from "~helpers";
import { memberSignIn } from "~test/utils/signIn";
import app from "~test/utils/testServer";

describe("Update AP Schedule Controller", () => {
  let cookie: string;
  let form: IFormDocument | null;
  let responses: Array<TEventResponse>;
  beforeAll(async () => {
    await connectToDB();
    form = await Form.findOne({ notes: "Todays Form" });
    const events = await Event.aggregate([
      {
        $match: {
          eventDate: {
            $gte: moment(form!.startMonth, "MM/DD/YYYY").toDate(),
            $lte: moment(form!.endMonth, "MM/DD/YYYY").toDate()
          }
        }
      },
      {
        $project: {
          _id: 1
        }
      }
    ]);
    responses = events.map(({ _id: id }) => ({
      id: id.toString(),
      value: "I want to work.",
      notes: "",
      updateEvent: false
    }));
    cookie = await memberSignIn();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("rejects requests where the event id and responses are missing", done => {
    app()
      .put("/api/forms/update/ap")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToUpdateApForm);
        done();
      });
  });

  it("rejects requests where the form id is invalid", done => {
    app()
      .put("/api/forms/update/ap")
      .set("Cookie", cookie)
      .expect("Content-Type", /json/)
      .send({
        id: "a01dc43483adb35b1ca678ea",
        responses
      })
      .expect(400)
      .then(res => {
        expect(res.body.err).toEqual(unableToLocateForm);
        done();
      });
  });

  it("accepts requests to insert events' employee responses", done => {
    app()
      .put("/api/forms/update/ap")
      .set("Cookie", cookie)
      .send({
        id: form!._id,
        responses
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual(
          "Successfully added your responses to the A/P form!"
        );
        done();
      });
  });

  it("accepts requests to update events' employee responses", done => {
    app()
      .put("/api/forms/update/ap")
      .set("Cookie", cookie)
      .send({
        id: form!._id,
        responses: responses.map(response => ({
          ...response,
          value: "Not available to work.",
          updateEvent: true
        }))
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        expect(res.body.message).toEqual(
          "Successfully added your responses to the A/P form!"
        );
        done();
      });
  });
});
