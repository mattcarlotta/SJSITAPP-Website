import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Model, Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs";

export type TActiveMembers = Array<{
  _id: Types.ObjectId;
  name: string;
}>;

export type TScheduledEventsForMember = Array<{
  _id: Types.ObjectId;
  eventCount: number;
}>;

export interface IUser {
  // _id?: Types.ObjectId;
  avatar?: string;
  email: string;
  role?: string;
  status?: string;
  firstName: string;
  lastName: string;
  password: string;
  registered?: Date;
  token: string;
  emailReminders?: boolean;
}

export interface UserSchedule extends IUser {
  response: string;
  notes?: string;
}
export interface IUserDocument extends Document {
  // _id?: Types.ObjectId;
  avatar?: string;
  email: string;
  role?: string;
  status?: string;
  firstName: string;
  lastName: string;
  password: string;
  registered?: Date;
  token: string;
  emailReminders?: boolean;
  createPassword: (password: string) => Promise<string>;
  comparePassword: (password: string) => Promise<boolean>;
}

// TODO Fix paginate typings
export interface IUserModel extends Model<IUserDocument> {
  createPassword: (password: string) => Promise<string>;
  comparePassword: (password: string) => Promise<boolean>;
  paginate(
    query?: any,
    options?: any,
    callback?: (err: any, result: any) => void
  ): Promise<any>;
}

// admin, staff, employee
const userSchema = new Schema<IUserDocument>({
  avatar: { type: String, default: "" },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  role: { type: String, default: "employee" },
  status: { type: String, default: "active" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  registered: {
    type: Date,
    required: true
  },
  token: { type: String, unique: true },
  emailReminders: { type: Boolean, default: true }
});

userSchema.plugin(mongoosePaginate);

// Generate a salt, password, then run callback
userSchema.statics.createPassword = async function createNewPassword(
  password: string
) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// Set a compare password method on the model
userSchema.methods.comparePassword = function compareNewPassword(
  password: string
) {
  return bcrypt.compare(password, this.password);
};

const UserModel = model<IUserDocument, IUserModel>("User", userSchema);

export default UserModel;
