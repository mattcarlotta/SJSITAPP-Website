import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model } from "mongoose";
import { PaginateModel } from "./pagination";

export interface IFormDocument extends Document {
  // _id?: Types.ObjectId;
  startMonth: Date;
  endMonth: Date;
  expirationDate: Date;
  seasonId: string;
  sendEmailNotificationsDate: Date | string;
  sentEmails?: boolean;
  notes?: string;
}

export type TFormModel = PaginateModel<IFormDocument>;

// monthly form
const formSchema = new Schema<IFormDocument>({
  startMonth: { type: Date, required: true },
  endMonth: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  seasonId: { type: String, required: true },
  sendEmailNotificationsDate: {
    type: Date,
    required: true
  },
  sentEmails: { type: Boolean, default: false },
  notes: String
});

formSchema.plugin(mongoosePaginate);

const FormModel = model<IFormDocument, TFormModel>("Form", formSchema);

export default FormModel;
