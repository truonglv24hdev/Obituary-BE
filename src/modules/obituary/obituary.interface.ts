import IUser from "../user/user.interface";

export interface IFamilyMember {
  _id: string;
  name: string;
}

export type IFamilyTree = Record<string, IFamilyMember[]>;

export interface ITimeLine {
  title: string;
  description: string;
  date: string;
}

export default interface IObituary {
  _id: string;
  user: IUser;
  quote: string;
  wordsFromFamily: string;
  lifeStory: string;
  familyTree: IFamilyTree;
  favorites: string[];
  timeline: ITimeLine[];
  quoteEvent: string;
  gallery: string[];
  video: string[];
}
