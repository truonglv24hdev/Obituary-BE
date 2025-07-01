import mongoose, { Schema } from "mongoose";
import ICondolences from "./condolences.interface";

const CondolencesSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    obituaryId: {
      type: Schema.Types.ObjectId,
      ref: "obituaries",
    },
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    photo: { type: String, required: false },
    video: { type: String, required: false },
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
    deleted: {
      type: Boolean,
      default:false
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
