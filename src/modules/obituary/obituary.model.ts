import mongoose, { Schema } from "mongoose";
import IObituary from "./obituary.interface";

const TimeLineSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
});

const EventSchema = new Schema({
  id: { type: String },
  eventTitle: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  show: { type: Boolean, default: true },
  schedule: [
    {
      date: { type: String, required: false },
      timeFrom: { type: String, required: false },
      timeTo: { type: String, required: false },
    },
  ],
});

const FamilyMemberSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const FamilyTreeSchema = new Schema({
  id: { type: String },
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
    favorites: [{ type: Object }],
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
