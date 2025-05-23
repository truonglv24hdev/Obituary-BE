import mongoose, { Schema } from "mongoose";
import IRSVP from "./rsvp.interface";

const RSVPSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    location: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
    },
    time:{
      type: String
    },
    verification: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
    },
    contact: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRSVP & mongoose.Document>("rsvp", RSVPSchema);
