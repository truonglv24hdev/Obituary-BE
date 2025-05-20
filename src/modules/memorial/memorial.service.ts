import MemorialSchema from "./memorial.model";
import MemorialDto from "./memorial.dto";
import { isEmptyObject } from "../../core/utils/helper";
import HttpException from "../../core/middleware/httpException";
import IMemorial from "./memorial.interface";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

class MemorialService {
  public memorialSchema = MemorialSchema;

  public async createMemorial(model: MemorialDto): Promise<IMemorial> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const memorial = await this.memorialSchema.create(model);
    if (!memorial) {
      throw new HttpException(400, "Memorial id not can create");
    }

    return memorial;
  }

  public async updateMemorial(
    memorialId: string,
    model: MemorialDto
  ): Promise<IMemorial> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const memorialUpdate = await this.memorialSchema.findByIdAndUpdate(
      memorialId,
      model,
      { new: true }
    );
    if (!memorialUpdate) throw new HttpException(404, "Update fail");

    return memorialUpdate;
  }

  public async getMemorialById(memorialId: string): Promise<IMemorial> {
    const memorial = await this.memorialSchema.findById(memorialId);
    if (!memorial) {
      throw new HttpException(404, "memorial is not found");
    }

    return memorial;
  }

  public async deleteMemorial(userId: string): Promise<IMemorial> {
    const result = await this.memorialSchema.findByIdAndDelete(userId);
    if (!result) {
      throw new HttpException(404, "Memorial not found");
    }
    return result;
  }
}

export default MemorialService;
