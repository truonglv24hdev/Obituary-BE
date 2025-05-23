import condolencesModel from "./condolences.model";
import CondolencesDto from "./condolences.dto";
import { isEmptyObject } from "../../core/utils/helper";
import HttpException from "../../core/middleware/httpException";
import ICondolences from "./condolences.interface";
import memorialModel from "../memorial/memorial.model";

class CondolencesService {
  public condolencesSchema = condolencesModel;
  public memorialSchema = memorialModel;

  public async createCondolences(
    memorialId: string,
    userId: string,
    model: CondolencesDto
  ): Promise<ICondolences> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const condolences = await this.condolencesSchema.create({
      user: userId,
      memorialId: memorialId,
      ...model,
    });

    if (!condolences) {
      throw new HttpException(400, "Obituary id not can create");
    }

    await this.memorialSchema.findByIdAndUpdate(memorialId, {
      $push: { condolences: condolences._id },
    });

    return condolences;
  }

  public async updateStatusCondolences(
    memorialId: string
  ): Promise<ICondolences> {
    const condolences = await this.condolencesSchema.findByIdAndUpdate(
      memorialId,
      {
        status: true,
      },
      { new: true }
    );
    if (!condolences) {
      throw new HttpException(404, "Condolence not found");
    }

    return condolences;
  }

  public async deleteCondolences(memorialId: string): Promise<ICondolences> {
    const condolences = await this.condolencesSchema.findByIdAndDelete(
      memorialId
    );
    if (!condolences) {
      throw new HttpException(404, "Condolence not found");
    }

    return condolences;
  }
}

export default CondolencesService;
