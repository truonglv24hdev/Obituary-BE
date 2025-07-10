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
    obituaryId: string,
    userId: string,
    model: CondolencesDto
  ): Promise<ICondolences> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const condolences = await this.condolencesSchema.create({
      user: userId,
      obituaryId: obituaryId,
      ...model,
    });

    if (!condolences) {
      throw new HttpException(400, "Obituary id not can create");
    }

    await this.memorialSchema.findOneAndUpdate(
      { obituaryId: obituaryId },
      {
        $push: { condolences: condolences._id },
      }
    );

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

  public async deleteCondolences(condolencesId: string): Promise<ICondolences> {
    const condolences = await this.condolencesSchema.findByIdAndUpdate(
      condolencesId,
      { deleted: true },
      { new: true }
    );
    if (!condolences) {
      throw new HttpException(402, "Condolence not found");
    }

    return condolences;
  }

  public async getCondolences(obituaryId: string): Promise<ICondolences[]> {
    const condolences = await this.condolencesSchema.find({
      obituaryId: obituaryId,
      deleted: false,
    });
    console.log(condolences)
    if (!condolences) {
      throw new HttpException(404, "Condolence not found");
    }

    return condolences;
  }
}

export default CondolencesService;
