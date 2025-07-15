import { ERole } from "../../types";

export default interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  country: string;
  code: string;
  googleId: string;
  facebookId: string;
  role: ERole
  premium: false
  deleted:boolean
}
