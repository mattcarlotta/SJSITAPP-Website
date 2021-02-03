import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model } from "mongoose";

export interface IFormDocument extends Document {
  startMonth: Date;
  endMonth: Date;
  expirationDate: Date;
  seasonId: string;
  sendEmailNotificationsDate: Date;
  sentEmails: boolean;
  notes: string;
}

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

const FormModel = model<IFormDocument>("Form", formSchema);

export default FormModel;
