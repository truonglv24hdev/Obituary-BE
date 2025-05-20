import IUser from "../user/user.interface";

export default interface IRSVP {
  _id: string;
  date: Date;
  user: IUser;
  verification: boolean;
  contact: string;
}
