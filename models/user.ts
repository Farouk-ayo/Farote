import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@/types";

interface UserDocument extends Omit<IUser, "_id">, Document {
  _id: Document["_id"];
}

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User ||
  mongoose.model<UserDocument>("User", UserSchema);
