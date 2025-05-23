import mongoose, { Schema } from "mongoose";
import ICondolences from "./condolences.interface";

const CondolencesSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    memorialId: {
      type: Schema.Types.ObjectId,
      ref: "memorials",
    },
    full_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    photo: [String],
    video: [String],
    status: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      default: () => new Date().toTimeString().slice(0, 5),
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICondolences & mongoose.Document>(
  "condolences",
  CondolencesSchema
);
