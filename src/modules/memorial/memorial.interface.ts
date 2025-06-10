import { EGender } from "../../types";

export default interface IMemorial {
  _id: string;
  user: string;
  picture: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: EGender;
  born: string;
  death: string;
  slug: string;
  condolences: string[];
  premium: false
}
