import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model, Types } from "mongoose";

export interface IMailDocument extends Document {
  _id?: Types.ObjectId;
  message: string;
  sendTo: Array<string>;
  sendFrom: string;
  sendDate: Date;
  status: string;
  subject: string;
}

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

const MailModel = model<IMailDocument>("Mail", mailSchema);

export default MailModel;