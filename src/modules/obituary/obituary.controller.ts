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
      const userId = req.user.id;
      if (req.files) {
        const files = req.files as {
          gallery?: Express.Multer.File[];
          video?: Express.Multer.File[];
        };
        const model: ObituaryDto = {
          ...req.body,
          gallery: (files.gallery ?? []).map(
            (file) => `/uploads/${file.filename}`
          ),
          video: (files.video ?? []).map((file) => `/uploads/${file.filename}`),
        };
        const obituary = await this.ObituaryService.createObituary(
          userId,
          model
        );
        res.status(200).json(obituary);
      } else {
        const model: ObituaryDto = req.body;
        const obituary = await this.ObituaryService.createObituary(
          userId,
          model
        );
        res.status(200).json(obituary);
      }
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
      const userId = req.user.id;
      if (req.files) {
        const files = req.files as {
          gallery?: Express.Multer.File[];
          video?: Express.Multer.File[];
        };
        const model: ObituaryDto = {
          ...req.body,
          gallery: (files.gallery ?? []).map(
            (file) => `/uploads/${file.filename}`
          ),
          video: (files.video ?? []).map((file) => `/uploads/${file.filename}`),
        };
        model.headerImage = `/uploads/${req.file?.filename}`;
        const obituary = await this.ObituaryService.updateObituaryById(
          req.params.id,
          userId,
          model
        );
        res.status(200).json(obituary);
      } else {
        const model: ObituaryDto = req.body;
        model.headerImage = `/uploads/${req.file?.filename}`;
        const obituary = await this.ObituaryService.updateObituaryById(
          req.params.id,
          userId,
          model
        );
        res.status(200).json(obituary);
      }
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
