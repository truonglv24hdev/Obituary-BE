import { NextFunction, Request, Response } from "express";
import ObituaryDto from "./obituary.dto";
import ObituaryService from "./obituary.service";

export default class ObituaryController {
  private ObituaryService = new ObituaryService();

  public createObituary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const files = req.files as {
        gallery?: Express.Multer.File[];
        video?: Express.Multer.File[];
      };

      const familyTree = JSON.parse(req.body.familyTree);
      const timeline = JSON.parse(req.body.timeline);

      const model: ObituaryDto = {
        ...req.body,
        familyTree: familyTree,
        timeline: timeline,
        gallery: (files.gallery ?? []).map(
          (file) => `/uploads/${file.filename}`
        ),
        video: (files.video ?? []).map((file) => `/uploads/${file.filename}`),
      };
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
      const rsvp = await this.ObituaryService.getObituaryById(req.params.id);
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
      const rsvp = await this.ObituaryService.deleteObituaryById(req.params.id);
      res.status(200).json(rsvp);
    } catch (error) {
      next(error);
    }
  };
}
