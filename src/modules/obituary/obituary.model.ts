import mongoose, { Schema } from "mongoose";
import IObituary from "./obituary.interface";

const TimeLineSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
});

const EventSchema = new Schema({
  eventTitle: String,
  description: String,
  location: String,
  date: [],
  timeFrom: [],
  timeTo: [],
});

const FamilyMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  { _id: false }
);

const FamilyTreeSchema = new Schema({
  category: { type: String, required: true },
  members: { type: [FamilyMemberSchema], default: [] },
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
    event: {
      type: [EventSchema],
      default: [],
    },
    familyTree: { type: [FamilyTreeSchema], default: [] },
    favorites: [String],
    timeLine: {
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
