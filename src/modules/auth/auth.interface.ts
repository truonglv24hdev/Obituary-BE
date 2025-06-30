export interface DataStoreInToken {
  id: string;
  role: string;
}

export interface TokenData {
  token: string;
}

export interface IForgotPassword {
  email: string;
  otp: string;
  expireAt: Date;
}
