import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 1,
      maxLength: 13,
    },

    age: {
      type: Number,
    },

    email: {
      type: String,

      unique: true,
      lowercase: true,
      trim: true,
    },
  }
 
);

export const User = mongoose.model("User", userSchema);
