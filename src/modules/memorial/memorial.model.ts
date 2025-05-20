import mongoose from "mongoose";
import IMemorial from "./memorial.interface";
import { EGender } from "../../types";

const MemorialSchema = new mongoose.Schema(
  {
    picture: {
      type: [String],
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMemorial & mongoose.Document>(
  "memorials",
  MemorialSchema
);
