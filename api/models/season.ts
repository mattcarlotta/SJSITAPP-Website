import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model } from "mongoose";

export interface ISeasonDocument extends Document {
  // _id?: Types.ObjectId;
  seasonId: string;
  startDate: Date;
  endDate: Date;
}

// current season year
const seasonSchema = new Schema<ISeasonDocument>({
  seasonId: { type: String, unique: true, lowercase: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

seasonSchema.plugin(mongoosePaginate);

const SeasonModel = model<ISeasonDocument>("Season", seasonSchema);

export default SeasonModel;
