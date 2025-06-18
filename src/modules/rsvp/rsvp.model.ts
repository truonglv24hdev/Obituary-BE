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
    obituaryId: {
      type: Schema.Types.ObjectId,
      ref: "obituaries",
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
    wakeService: {
      type: Object,
    },
    cortegeDeparture: {
      type: Object,
    },
    cremation: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRSVP & mongoose.Document>("rsvp", RSVPSchema);
