import mongoose from "mongoose";
import IUser from "./user.interface";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: false,
    },
    country: {
      type: String,
      require: false,
    },
    code: {
      type: String,
      require: false,
    },
    memorials:{
      type: [String],
      require:false
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser & mongoose.Document>("users", UserSchema);
