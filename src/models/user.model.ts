import mongoose, { Schema } from "mongoose";
import { User } from "../types/user";

const UserSchema: Schema<User> = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<User>("User", UserSchema);

export default User;
