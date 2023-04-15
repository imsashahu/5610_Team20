import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    handle: String,
    bio: String,
    dataOfBirth: String,
    major: String,
    email: { type: String },
    role: {
      type: String,
      default: "STUDENT",
      enum: ["STUDENT", "ADMIN", "FACULTY"],
    },
  },
  {
    collection: "users",
  }
);
export default usersSchema;
