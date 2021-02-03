import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model, Types } from "mongoose";

export interface ISeasonDocument extends Document {
  _id?: Types.ObjectId;
  token: string;
  authorizedEmail: string;
  email: string;
  role: string;
  expiration: Date;
}

// token templates
const tokenSchema = new Schema<ISeasonDocument>({
  token: { type: String, required: true, unique: true },
  authorizedEmail: { type: String, lowercase: true, unique: true },
  email: { type: String, required: true, lowercase: true },
  role: { type: String, required: true },
  expiration: {
    type: Date,
    required: true
  }
});

tokenSchema.plugin(mongoosePaginate);

const TokenModel = model<ISeasonDocument>("Token", tokenSchema);

export default TokenModel;
