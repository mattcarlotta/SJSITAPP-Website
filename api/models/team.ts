import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model, Types } from "mongoose";

export interface ITeamDocument extends Document {
  _id?: Types.ObjectId;
  league: string;
  team: string;
  name: string;
}

// NHL/AHL teams
const teamSchema = new Schema<ITeamDocument>({
  league: { type: String, required: true },
  team: { type: String, unique: true },
  name: { type: String, unique: true, lowercase: true }
});

teamSchema.plugin(mongoosePaginate);

const TeamModel = model<ITeamDocument>("Team", teamSchema);

export default TeamModel;
