import mongoose, { Schema } from "mongoose";
import IObituary from "./obituary.interface";

const FamilyMemberSchema = new Schema({
  name: { type: String, required: true },
});

const FamilyTreeSchema = {
  type: Map,
  of: [FamilyMemberSchema],
  default: {},
};

const TimeLineSchema = new Schema({
  title: String,
  description: String,
  date: Date,
});

const ObituarySchema = new Schema<IObituary>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    memorial: {
      type: Schema.Types.ObjectId,
      ref: "memorials",
    },
    headerImage: {
      type: String,
      required: false,
    },
    quote: {
      type: String,
    },
    wordsFromFamily: {
      type: String,
    },
    lifeStory: {
      type: String,
    },
    wakeDetails: {
      type: Object,
    },
    cortegeDeparture: {
      type: Object,
    },
    cremation: {
      type: Object,
    },
    familyTree: FamilyTreeSchema,
    favorites: [String],
    timeline: {
      type: [TimeLineSchema],
      default: [],
    },
    gallery: [{ type: String }],
    video: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const obituaryModel = mongoose.model<IObituary>("obituary", ObituarySchema);
export default obituaryModel;
