import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model, Types } from "mongoose";

type TId = Types.ObjectId | string;

export type TEventAggResponses = Array<{
  _id: TId;
  responses: Array<string>;
}>;

export type TEventMemberAvailability = Array<{
  _id: TId;
  availability: number;
}>;

export type TEventSchedule = Array<{
  _id: string;
  title?: string;
  employeeIds: Array<TId>;
}>;

export type TEventResponses = Array<{
  _id: Types.ObjectId;
  response: string;
  notes?: string;
}>;

export interface IEventDocument extends Document {
  _id?: Types.ObjectId;
  eventType: string;
  eventDate: string;
  location?: string;
  employeeResponses?: TEventResponses;
  schedule: TEventSchedule;
  scheduledIds?: Array<any>;
  seasonId: string;
  team: string;
  opponent?: string;
  callTimes: Array<string>;
  uniform?: string;
  notes?: string;
  sentEmailReminders?: boolean;
}

// event
const eventSchema = new Schema<IEventDocument>({
  eventType: { type: String, default: "Game", required: true },
  eventDate: { type: Date, required: true },
  location: { type: String, default: "SAP Center at San Jose" },
  employeeResponses: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      response: { type: String, required: true },
      notes: String
    }
  ],
  schedule: [
    {
      _id: { type: String, required: true },
      title: String,
      employeeIds: [{ type: Schema.Types.ObjectId, ref: "User" }]
    }
  ],
  scheduledIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  seasonId: { type: String, required: true },
  team: { type: String, required: true },
  opponent: String,
  callTimes: { type: Array, of: Date, required: true },
  uniform: { type: String, default: "Sharks Teal Jersey" },
  notes: String,
  sentEmailReminders: { type: Boolean, default: false }
});

eventSchema.plugin(mongoosePaginate);

eventSchema.pre("save", function saveSchedule(next) {
  this.schedule = this.callTimes.map(time => ({
    _id: time,
    employeeIds: []
  }));
  next();
});

const EventModel = model<IEventDocument>("Event", eventSchema);

export default EventModel;
