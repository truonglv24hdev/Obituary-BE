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
      required: false,
    },
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(EGender),
      default: EGender.MALE,
    },
    born: {
      type: String,
    },
    death: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    condolences: [
      {
        type: Schema.Types.ObjectId,
        ref: "condolences",
      },
    ],
    premium:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMemorial & mongoose.Document>(
  "memorials",
  MemorialSchema
);
