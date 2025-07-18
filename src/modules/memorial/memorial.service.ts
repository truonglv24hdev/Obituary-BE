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
    userIdOrNull: string | null,
    model: MemorialDto
  ): Promise<IMemorial> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const query: any = { _id: memorialId };
    if (userIdOrNull) {
      query.user = userIdOrNull;
    }

    const memorial = await this.memorialSchema.findOne(query);

    if (!memorial) {
      throw new HttpException(400, "Memorial not found");
    }

    let updateData = { ...model };

    if (model.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(model.password, salt);
      updateData.password = hashedPassword;
    }

    const memorialUpdate = await this.memorialSchema.findOneAndUpdate(
      query,
      updateData,
      { new: true }
    );

    if (!memorialUpdate) {
      throw new HttpException(404, "Update fail");
    }

    return memorialUpdate;
  }

  public async getMemorials(userId: string): Promise<IMemorial[]> {
    const memorials = await this.memorialSchema.find({ user: userId });
    return memorials;
  }

  public async getMemorialById(memorialId: string): Promise<IMemorial> {
    const memorial = await this.memorialSchema
      .findOne({ _id: memorialId, deleted: false })
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

  public async getMemorialByUser(
    userId: string,
    skip: number,
    limit: number
  ): Promise<IMemorial[]> {
    return await this.memorialSchema
      .find({ user: userId, deleted: false })
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

  public async updateStatus(userId: string) {
    const memorial = await this.memorialSchema.findById(userId);
    const memorialNew = await this.memorialSchema.findByIdAndUpdate(userId, {
      deleted: !memorial?.deleted,
    });
    if (!memorialNew) {
      throw new HttpException(409, "memorialNew is not exist");
    }

    return memorialNew;
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
  ): Promise<IMemorial[]> {
    const firstNameRegax = new RegExp(firstName, "i");
    const lastNameRegax = new RegExp(lastName, "i");

    const memorial = await this.memorialSchema.find({
      first_name: firstNameRegax,
      last_name: lastNameRegax,
    });
    if (!memorial) {
      throw new HttpException(404, "memorial is not found");
    }

    return memorial;
  }

  public async getAllMemorial(searchMemorial?: string): Promise<IMemorial[]> {
    const memorials = await this.memorialSchema
      .find({
        $or: [
          { first_name: { $regex: searchMemorial, $options: "i" } },
          { last_name: { $regex: searchMemorial, $options: "i" } },
        ],
      })
      .populate({ path: "user", model: "users" });

    if (!memorials) {
      throw new HttpException(404, "memorial is not found");
    }

    return memorials;
  }
}

export default MemorialService;
