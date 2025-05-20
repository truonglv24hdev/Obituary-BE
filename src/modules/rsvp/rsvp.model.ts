import mongoose from "mongoose";
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
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRSVP & mongoose.Document>("rsvp", RSVPSchema);
