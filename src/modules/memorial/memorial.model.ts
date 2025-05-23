import mongoose, { Schema } from "mongoose";
import IMemorial from "./memorial.interface";
import { EGender } from "../../types";

const MemorialSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    picture: {
      type: String,
      require: false,
    },
    first_name: {
      type: String,
      require: true,
    },
    middle_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: Object.values(EGender),
      default: EGender.MALE,
    },
    born: {
      type: Date,
    },
    death: {
      type: Date,
    },
    condolences: [
      {
        type: Schema.Types.ObjectId,
        ref: "condolences",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMemorial & mongoose.Document>(
  "memorials",
  MemorialSchema
);
