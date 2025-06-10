export interface IWakeServiceRSVP {
  attending: boolean;
  date: Date;
  time: string;
}

export default interface IRSVP {
  _id: string;
  first_name: string;
  last_name: string;
  verification: boolean;
  email: string;
  contact: string;
  wakeServiceRSVP: IWakeServiceRSVP;
  cortegeDepartureRSVP: boolean;
  cremationRSVP: boolean;
}
