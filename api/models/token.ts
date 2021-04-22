import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model } from "mongoose";
import { PaginateModel } from "./pagination";

export interface ITokenDocument extends Document {
  // _id?: Types.ObjectId;
  token: string;
  authorizedEmail: string;
  email?: string;
  role: string;
  expiration: Date;
}

export type TTokenModel = PaginateModel<ITokenDocument>;

// token templates
const tokenSchema = new Schema<ITokenDocument>({
  token: { type: String, required: true, unique: true },
  authorizedEmail: { type: String, lowercase: true, unique: true },
  email: { type: String, lowercase: true },
  role: { type: String, lowercase: true, required: true },
  expiration: {
    type: Date,
    required: true
  }
});

tokenSchema.plugin(mongoosePaginate);

const TokenModel = model<ITokenDocument, TTokenModel>("Token", tokenSchema);

export default TokenModel;
