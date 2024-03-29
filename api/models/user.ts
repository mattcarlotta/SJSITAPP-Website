import mongoosePaginate from "mongoose-paginate-v2";
import { Document, Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { PaginateModel } from "./pagination";

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

interface IUserModelProperties {
  createPassword: (password: string) => Promise<string>;
  comparePassword: (password: string) => Promise<boolean>;
}
export interface IUserDocument extends Document, IUserModelProperties {
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

export type TUserModel = PaginateModel<IUserDocument> & IUserModelProperties;

// admin, staff, member
const userSchema = new Schema<IUserDocument>({
  avatar: { type: String, default: "" },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  role: { type: String, default: "member" },
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
userSchema.methods.comparePassword = function comparePassword(
  password: string
) {
  return bcrypt.compare(password, this.password);
};

const UserModel = model<IUserDocument, TUserModel>("User", userSchema);

export default UserModel;
