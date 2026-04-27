import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    job: String
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", userSchema);

export default User;