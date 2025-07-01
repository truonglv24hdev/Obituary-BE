import { EGender } from "../../types";
import IRSVP from "../rsvp/rsvp.interface";

export default interface IMemorial {
  _id: string;
  user: string;
  obituaryId: string;
  picture: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: EGender;
  born: string;
  death: string;
  slug: string;
  rsvps: [IRSVP];
  condolences: string[];
  premium: false
}
