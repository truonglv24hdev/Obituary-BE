import MemorialSchema from "./memorial.model";
import MemorialDto from "./memorial.dto";
import { isEmptyObject } from "../../core/utils/helper";
import HttpException from "../../core/middleware/httpException";
import IMemorial from "./memorial.interface";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import condolencesModel from "../condolences/condolences.model";
import UserSchema from "../user/user.model";
dayjs.extend(customParseFormat);

class MemorialService {
  public memorialSchema = MemorialSchema;
  public userSchema = UserSchema;

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

    const memorialUpdate = await this.memorialSchema.findOneAndUpdate(
      { _id: memorialId, user: userId },
      model,
      { new: true }
    );
    if (!memorialUpdate) throw new HttpException(404, "Update fail");

    return memorialUpdate;
  }

  public async getMemorialById(memorialId: string): Promise<IMemorial> {
    const memorial = await this.memorialSchema
      .findById(memorialId)
      .populate({ path: "condolences", model: condolencesModel });
    if (!memorial) {
      throw new HttpException(404, "memorial is not found");
    }

    return memorial;
  }

  public async getMemorialByUser(userId: string): Promise<IMemorial[]> {
    const memorial = await this.memorialSchema
      .find({ user: userId })
      .populate({ path: "condolences", model: condolencesModel });
    if (!memorial) {
      throw new HttpException(404, "memorial is not found");
    }

    return memorial;
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
}

export default MemorialService;
