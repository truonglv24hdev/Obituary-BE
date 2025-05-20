import { EGender } from "../../types";

export default interface IMemorial {
  _id: string;
  picture: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: EGender;
  born: Date;
  death: Date;
}
