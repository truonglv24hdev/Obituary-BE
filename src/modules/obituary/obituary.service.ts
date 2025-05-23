import obituaryModel from "./obituary.model";
import ObituaryDto from "./obituary.dto";
import { isEmptyObject } from "../../core/utils/helper";
import HttpException from "../../core/middleware/httpException";
import IObituary from "./obituary.interface";

class ObituaryService {
  public obituarySchema = obituaryModel;

  public async createObituary(
    userId: string,
    model: ObituaryDto
  ): Promise<IObituary> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const rsvp = await this.obituarySchema.create({ user: userId, ...model });
    if (!rsvp) {
      throw new HttpException(400, "Obituary id not can create");
    }

    return rsvp;
  }

  public async updateObituaryById(
    obituaryId: string,
    userId: string,
    model: ObituaryDto
  ): Promise<IObituary> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const obituaryUpdate = await this.obituarySchema.findOneAndUpdate(
      { user: userId, _id: obituaryId },
      model,
      { new: true }
    );
    if (!obituaryUpdate) {
      throw new HttpException(400, "Obituary can not update");
    }

    return obituaryUpdate;
  }

  public async getObituaryById(obituaryId: string): Promise<IObituary> {
    const Obituary = await this.obituarySchema.findById(obituaryId);
    if (!Obituary) {
      throw new HttpException(404, "Obituary not found");
    }

    return Obituary;
  }

  public async deleteObituaryById(obituaryId: string): Promise<IObituary> {
    const result = await this.obituarySchema.findByIdAndDelete(obituaryId);
    if (!result) {
      throw new HttpException(404, "Obituary delete fail");
    }
    return result;
  }
}

export default ObituaryService;
