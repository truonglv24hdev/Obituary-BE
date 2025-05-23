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
          photo: (files.photo ?? []).map((file) => `/uploads/${file.filename}`),
          video: (files.video ?? []).map((file) => `/uploads/${file.filename}`),
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
      const role = req.user.role;
      if (role === ERole.ADMIN) {
        const result = await this.condolencesService.updateStatusCondolences(
          req.params.id
        );

        res.status(200).json(result);
      }else{
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
      const role = req.user.role;
      if (role === ERole.ADMIN) {
        const result = await this.condolencesService.deleteCondolences(
          req.params.id
        );

        res.status(200).json(result);
      }else{
        res.status(404).json("not authozation");
      }
    } catch (error) {}
  };
}
