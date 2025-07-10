import MemorialSchema from "./memorial.model";
import MemorialDto from "./memorial.dto";
import { isEmptyObject } from "../../core/utils/helper";
import HttpException from "../../core/middleware/httpException";
import IMemorial from "./memorial.interface";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import condolencesModel from "../condolences/condolences.model";
import UserSchema from "../user/user.model";
import obituaryModel from "../obituary/obituary.model";
import rsvpModel from "../rsvp/rsvp.model";
import bcrypt from "bcryptjs";
import { sendMail } from "../../core/utils/sendMailer";
import forgotPasswordModel from "../auth/forgotPassword.model";

dayjs.extend(customParseFormat);

class MemorialService {
  public memorialSchema = MemorialSchema;
  public userSchema = UserSchema;
  public obituarySchema = obituaryModel;
  public forgotPasswordSchema = forgotPasswordModel;

  public async createMemorial(
    userId: string,
    model: MemorialDto
  ): Promise<IMemorial> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const memorial = await this.memorialSchema.create({
      user: userId,
      ...model,
    });

    const obituary = await this.obituarySchema.create({
      memorial: memorial._id,
      user: userId,
    });

    await this.memorialSchema.findByIdAndUpdate(
      memorial._id,
      { obituaryId: obituary._id },
      { new: true }
    );

    await this.userSchema.findByIdAndUpdate(
      userId,
      {
        $push: { memorials: memorial._id },
      },
      { new: true }
    );

    if (!memorial) {
      throw new HttpException(400, "Memorial id not can create");
    }

    return memorial;
  }

  public async updateMemorial(
    memorialId: string,
    userId: string,
    model: MemorialDto
  ): Promise<IMemorial> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const memorial = await this.memorialSchema.findOne({
      _id: memorialId,
      user: userId,
    });

    if (!memorial) {
      throw new HttpException(400, "memorial not found");
    }

    let memorialUpdate;

    if (model.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(model.password, salt);
      memorialUpdate = await this.memorialSchema.findOneAndUpdate(
        { _id: memorialId, user: userId },
        {
          ...model,
          password: hashedPassword,
        },
        { new: true }
      );
    } else {
      memorialUpdate = await this.memorialSchema.findOneAndUpdate(
        { _id: memorialId, user: userId },
        model,
        { new: true }
      );
    }

    if (!memorialUpdate) throw new HttpException(404, "Update fail");

    return memorialUpdate;
  }

  public async getMemorialById(memorialId: string): Promise<IMemorial> {
    const memorial = await this.memorialSchema.findById(memorialId).populate([
      {
        path: "condolences",
        model: condolencesModel,
        match: { deleted: false },
      },
      { path: "rsvps", model: rsvpModel },
    ]);
    if (!memorial) {
      throw new HttpException(404, "memorial is not found");
    }

    return memorial;
  }

  public async getMemorialByUser(
    userId: string,
    skip: number,
    limit: number
  ): Promise<IMemorial[]> {
    return await this.memorialSchema
      .find({ user: userId })
      .skip(skip)
      .limit(limit)
      .populate([
        { path: "condolences", model: condolencesModel },
        { path: "rsvps", model: rsvpModel },
      ]);
  }

  public async countMemorialByUser(userId: string): Promise<number> {
    return await this.memorialSchema.countDocuments({ user: userId });
  }

  public async deleteMemorial(
    memorialId: string,
    userId: string
  ): Promise<IMemorial> {
    const result = await this.memorialSchema.findOneAndDelete({
      _id: memorialId,
      user: userId,
    });
    if (!result) {
      throw new HttpException(404, "Memorial not found");
    }
    return result;
  }

  public async verify(id: string, password: string) {
    const memorial = await this.memorialSchema.findById(id);
    if (!memorial) return 1;

    const isMatch = await bcrypt.compare(password, memorial.password);
    if (isMatch) {
      return 2;
    } else {
      return 3;
    }
  }

  public async forgotPassword(
    email: string,
    memorialId: string,
    userId: string
  ) {
    const findMemorial = await this.memorialSchema.findOne({
      user: userId,
      _id: memorialId,
    });
    if (!findMemorial) {
      return 1;
    }
    const generateRandomNumber = (length: number) => {
      const characters = "0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    const otp = generateRandomNumber(6);
    const objectForgotPassword = {
      email: email,
      otp: otp,
      expireAt: Date.now(),
    };

    const forgotPassword = await this.forgotPasswordSchema.create(
      objectForgotPassword
    );

    if (findMemorial && forgotPassword) {
      const subject = "Rest Password";
      const html = `Otp rest password là <b>${otp}</b>, Expire <b>1 hour</b>. `;

      sendMail(email, subject, html);

      return 2;
    } else {
      return "Email not find";
    }
  }

  public async getMemorialBySearch(
    firstName: string,
    lastName: string
  ): Promise<IMemorial> {
    const memorial = await this.memorialSchema
      .findOne({ first_name: firstName, last_name: lastName })
      .populate([
        {
          path: "condolences",
          model: condolencesModel,
          match: { deleted: false },
        },
        { path: "rsvps", model: rsvpModel },
      ]);
    if (!memorial) {
      throw new HttpException(404, "memorial is not found");
    }

    return memorial;
  }
}

export default MemorialService;
