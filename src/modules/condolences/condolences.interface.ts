export default interface ICondolences {
  _id: string;
  memorialId: string;
  full_name: string;
  email: string;
  message: string;
  photo: string;
  video: string;
  status: boolean;
  date: Date;
  time: string;
}
