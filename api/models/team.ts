import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model, models } from "mongoose";

// NHL/AHL teams
const teamSchema = new Schema({
  league: { type: String, required: true },
  team: { type: String, unique: true },
  name: { type: String, unique: true, lowercase: true }
});

teamSchema.plugin(mongoosePaginate);

export default models.Team || model("Team", teamSchema);
