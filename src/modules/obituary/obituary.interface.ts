import IMemorial from "../memorial/memorial.interface";
import IUser from "../user/user.interface";

export interface IFamilyTree {
  id: string;
  _id: string;
  category: string;
  members: [
    {
      id: string;
      _id: string;
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

export interface ISchedule {
  date: string;
  timeFrom: string;
  timeTo: string;
}

export interface IEvent {
  id: string;
  eventTitle: string;
  description: string;
  location: string;
  show: boolean;
  schedule: ISchedule[];
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
  favorites: [object];
  timeLine: ITimeLine[];
  event: IEvent[];
  gallery: string[];
  video: string[];
}
