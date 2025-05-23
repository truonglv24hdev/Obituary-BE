import rsvpModel from "./rsvp.model";
import RSVPDto from "./rsvp.dto";
import { isEmptyObject } from "../../core/utils/helper";
import HttpException from "../../core/middleware/httpException";
import IRSVP from "./rsvp.interface";
import IPagination from "../../core/interface/pagination.interface";

class RSVPService {
  public rsvpSchema = rsvpModel;

  public async createRSVP(userId: string, model: RSVPDto): Promise<IRSVP> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const rsvp = await this.rsvpSchema.create({ user: userId, ...model });
    if (!rsvp) {
      throw new HttpException(400, "RSVP id not can create");
    }

    return rsvp;
  }

  public async updateRSVPById(
    rsvpId: string,
    userId: string,
    model: RSVPDto
  ): Promise<IRSVP> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const rsvp = await this.rsvpSchema.findOne({ _id: rsvpId, user: userId });
    if (!rsvp) {
      throw new HttpException(400, "RSVP id not exist");
    }

    const rsvpUpdate = await this.rsvpSchema.findOneAndUpdate(
      { user: userId, _id: rsvpId },
      model,
      { new: true }
    );
    if (!rsvpUpdate) throw new HttpException(404, "Update fail");

    return rsvpUpdate;
  }

  public async getRSVPById(rsvpId: string): Promise<IRSVP> {
    const rsvp = await this.rsvpSchema.findById(rsvpId);
    if (!rsvp) {
      throw new HttpException(409, "RSVP is not exist");
    }

    return rsvp;
  }

  public async deleteRSVPById(rsvpId: string, userId: string): Promise<IRSVP> {
    const result = await this.rsvpSchema.findOneAndDelete({
      _id: rsvpId,
      user: userId,
    });
    if (!result) {
      throw new HttpException(404, "RSVP not found");
    }
    return result;
  }
}

export default RSVPService;
