import mongoose, { Schema } from "mongoose";

const userModel = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is Required"],
    // This actualluy a either and or case. eaither true or the message
  },
  password: {
    type: String,
    required: [true, "Password Required"], // This actualluy a either and or case. either true or the message
  },
  confirmPassword: String,
  about: String,
  profileURL: String,
});

export const User = mongoose.models.users || mongoose.model("users", userModel); // collection will be created with the name users.
