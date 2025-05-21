import { NextFunction, Request, Response } from "express";
import ObituaryDto from "./obituary.dto";
import ObituaryService from "./obituary.service";

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export default class ObituaryController {
  private ObituaryService = new ObituaryService();

  public createObituary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: ObituaryDto = req.body;
      const rsvp = await this.ObituaryService.createObituary(model);
      res.status(200).json(rsvp);
    } catch (error) {
      next(error);
    }
  };

  public updateObituaryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: ObituaryDto = req.body;
      const rsvp = await this.ObituaryService.updateObituaryById(
        req.params.id,
        model
      );
      res.status(200).json(rsvp);
    } catch (error) {
      next(error);
    }
  };

  public getObituaryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rsvp = await this.ObituaryService.getObituaryById(
        req.params.id,
      );
      res.status(200).json(rsvp);
    } catch (error) {
      next(error);
    }
  };

  public deleteObituaryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rsvp = await this.ObituaryService.deleteObituaryById(
        req.params.id,
      );
      res.status(200).json(rsvp);
    } catch (error) {
      next(error);
    }
  };
}
