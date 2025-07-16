import mongoose, { Schema } from "mongoose";
import IMemorial from "./memorial.interface";
import { EGender, EModeration, EPrivacy } from "../../types";

const MemorialSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    obituaryId: {
      type: Schema.Types.ObjectId,
      ref: "obituaries",
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
    privacy: {
      type: String,
      enum: Object.values(EPrivacy),
      default: EPrivacy.PUBLIC,
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
    rsvps: [
      {
        type: Schema.Types.ObjectId,
        ref: "rsvp",
      },
    ],
    condolences: [
      {
        type: Schema.Types.ObjectId,
        ref: "condolences",
      },
    ],
    premium: {
      type: Boolean,
      default: false,
    },
    setPassword: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    require_email: {
      type: Boolean,
      default: false,
    },
    moderation: {
      type: String,
      enum: Object.values(EModeration),
      default: EModeration.PRE,
    },
    add_photos: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
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
