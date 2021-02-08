import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model } from "mongoose";
import { PaginateModel } from "./pagination";

export interface IMailDocument extends Document {
  // _id?: Types.ObjectId;
  message: string;
  sendTo: Array<string>;
  sendFrom: string;
  sendDate: Date | string;
  status: string;
  subject: string;
}

export type TMailModel = PaginateModel<IMailDocument>;

// email
const mailSchema = new Schema<IMailDocument>({
  message: { type: String, required: true },
  sendTo: [{ type: String, required: true }],
  sendFrom: { type: String, required: true },
  sendDate: {
    type: Date,
    required: true
  },
  status: { type: String, default: "unsent" },
  subject: { type: String, required: true }
});

mailSchema.plugin(mongoosePaginate);

const MailModel = model<IMailDocument, TMailModel>("Mail", mailSchema);

export default MailModel;
