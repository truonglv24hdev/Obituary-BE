export interface IServiceRSVP {
  attending: string;
  date: string;
  time: string;
}

export default interface IRSVP {
  _id: string;
  obituaryId: string;
  first_name: string;
  last_name: string;
  verification: boolean;
  email: string;
  contact: string;
  wakeService: IServiceRSVP;
  cortegeDeparture: IServiceRSVP;
  cremation: IServiceRSVP;
}
