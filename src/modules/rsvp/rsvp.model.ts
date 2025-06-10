import mongoose, { Schema } from "mongoose";
import IRSVP from "./rsvp.interface";

const RSVPSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
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
    wakeServiceRSVP: {
      type: Object,
    },
    cortegeDepartureRSVP: {
      type: Boolean,
      default: null,
    },
    cremationRSVP: {
      type: Boolean,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRSVP & mongoose.Document>("rsvp", RSVPSchema);
