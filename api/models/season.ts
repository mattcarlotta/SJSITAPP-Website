import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model } from "mongoose";
import { PaginateModel } from "./pagination";

export interface ISeasonDocument extends Document {
  // _id?: Types.ObjectId;
  seasonId: string;
  startDate: Date;
  endDate: Date;
}

export type TSeasonModel = PaginateModel<ISeasonDocument>;

// current season year
const seasonSchema = new Schema<ISeasonDocument>({
  seasonId: { type: String, unique: true, lowercase: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

seasonSchema.plugin(mongoosePaginate);

const SeasonModel = model<ISeasonDocument, TSeasonModel>(
  "Season",
  seasonSchema
);

export default SeasonModel;
