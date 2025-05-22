import { NextFunction, Request, Response } from "express";
import RSVPService from "./rsvp.service";
import RSVPDto from "./rsvp.dto";

export default class RSVPController {
  private rsvpService = new RSVPService();

  public createRSVP = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: RSVPDto = req.body;
      const rsvp = await this.rsvpService.createRSVP(model);
      res.status(200).json(rsvp);
    } catch (error) {
      next(error);
    }
  };

  public updateRSVPById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Gán model sau khi req.body đã đầy đủ
      const model: RSVPDto = req.body;
      const user = await this.rsvpService.updateRSVPById(req.params.id, model);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public getRSVPById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.rsvpService.getRSVPById(req.params.id);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public deleteRSVPById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.rsvpService.deleteRSVPById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
