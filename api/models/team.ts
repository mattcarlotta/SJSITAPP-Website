import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model } from "mongoose";
import { PaginateModel } from "./pagination";

export interface ITeamDocument extends Document {
  // _id?: Types.ObjectId;
  league: string;
  team: string;
  name: string;
}

export type TTeamModel = PaginateModel<ITeamDocument>;

// NHL/AHL teams
const teamSchema = new Schema<ITeamDocument>({
  league: { type: String, required: true },
  team: { type: String, unique: true },
  name: { type: String, unique: true, lowercase: true }
});

teamSchema.plugin(mongoosePaginate);

const TeamModel = model<ITeamDocument, TTeamModel>("Team", teamSchema);

export default TeamModel;
