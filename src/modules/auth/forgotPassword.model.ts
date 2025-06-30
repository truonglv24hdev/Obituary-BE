import mongoose from "mongoose";
import { IForgotPassword } from "./auth.interface";

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },
    expireAt: { type: Date, expires: 3600 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IForgotPassword & mongoose.Document>("forgotPassword", forgotPasswordSchema);
