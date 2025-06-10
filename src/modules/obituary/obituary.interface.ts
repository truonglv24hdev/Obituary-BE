import IMemorial from "../memorial/memorial.interface";
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

export interface IWakeDetails {
  description: string;
  location: string;
  date: Date;
  timeFrom: string;
  timeTo: string;
}

export interface ICortegeDeparture {
  description: string;
  location: string;
  date: Date;
  time: string;
}

export interface ICremation {
  description: string;
  location: string;
  date: Date;
  time: string;
}

export default interface IObituary {
  _id: string;
  user: IUser;
  memorial: IMemorial
  quote: string;
  wordsFromFamily: string;
  lifeStory: string;
  familyTree: IFamilyTree;
  favorites: string[];
  timeline: ITimeLine[];
  wakeDetails: IWakeDetails;
  cortegeDeparture: ICortegeDeparture;
  cremation: ICremation;
  gallery: string[];
  video: string[];
}
