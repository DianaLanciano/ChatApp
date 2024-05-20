import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 6,
  },
  gender: {
    type: String,
    require: true,
    enum: ["male", "female"],
  },
  profilePicture: {
    type: String,
    default: '',
  },
}, { timestamps:true });

const User = mongoose.model("User", userSchema);

export default User;