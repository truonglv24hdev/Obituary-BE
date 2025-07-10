import { NextFunction, Request, Response } from "express";
import CondolencesDto from "./condolences.dto";
import CondolencesService from "./condolences.service";
import { ERole } from "../../types";

export default class CondolencesController {
  private condolencesService = new CondolencesService();

  public createCondolences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.id;
      if (req.files) {
        const files = req.files as {
          photo?: Express.Multer.File[];
          video?: Express.Multer.File[];
        };
        const model: CondolencesDto = {
          ...req.body,
          ...(files.photo?.[0] && {
            photo: `/uploads/${files.photo[0].filename}`,
          }),
          ...(files.video?.[0] && {
            video: `/uploads/${files.video[0].filename}`,
          }),
        };
        const obituary = await this.condolencesService.createCondolences(
          req.params.id,
          userId,
          model
        );
        res.status(200).json(obituary);
      } else {
        const model: CondolencesDto = req.body;
        const obituary = await this.condolencesService.createCondolences(
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

  public updateStatusCondolences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user.id;
      if (user) {
        const result = await this.condolencesService.updateStatusCondolences(
          req.params.id
        );

        if (result) {
          res.status(200).json({ message: "Accept success.", code: 1 });
        }
      } else {
        res.status(404).json("not authozation");
      }
    } catch (error) {}
  };

  public deleteCondolences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user.id;
      if (user) {
        const result = await this.condolencesService.deleteCondolences(
          req.params.id
        );

        res.status(200).json({ message: "Delete success.", code: 1 });
      } else {
        res.status(404).json("not authozation");
      }
    } catch (error) {}
  };

  public getCondolences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const condolences = await this.condolencesService.getCondolences(
        req.params.id
      );
      res.status(200).json(condolences);
    } catch (error) {}
  };

  public getAllCondolences = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const condolences = await this.condolencesService.getAllCondolences(
        req.params.id
      );
      res.status(200).json(condolences);
    } catch (error) {}
  };
}
