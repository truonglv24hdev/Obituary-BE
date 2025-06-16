import IMemorial from "../memorial/memorial.interface";
import IUser from "../user/user.interface";

export interface IFamilyTree {
  _id: string;
  category: string;
  members: [
    {
      name: string;
      image: string;
    }
  ];
}

export interface ITimeLine {
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface IEvent {
  eventTitle: string;
  description: string;
  location: string;
  date: string[];
  timeFrom: string[];
  timeTo: string[];
}

export default interface IObituary {
  _id: string;
  user: IUser;
  memorial: IMemorial;
  headerImage: string;
  quote: string;
  wordsFromFamily: string;
  lifeStory: string;
  familyTree: IFamilyTree[];
  favorites: string[];
  timeLine: ITimeLine[];
  event: IEvent[];
  gallery: string[];
  video: string[];
}
