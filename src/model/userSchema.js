import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  profileimg:{
    type:String,
    default:""
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
