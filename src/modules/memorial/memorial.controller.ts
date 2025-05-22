import { NextFunction, Request, Response } from "express";
import MemorialService from "./memorial.service";
import MemorialDto from "./memorial.dto";

export default class MemorialController {
  private memorialService = new MemorialService();

  public createMemorial = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: MemorialDto = req.body;
      model.picture = `/uploads/${req.file?.originalname}`;
      const memorial = await this.memorialService.createMemorial(model);
      res.status(200).json(memorial);
    } catch (error) {
      next(error);
    }
  };

  public updateMemorialById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: MemorialDto = req.body;
      model.picture = `/uploads/${req.file?.originalname}`;
      const memorial = await this.memorialService.updateMemorial(
        req.params.id,
        model
      );
      res.status(200).json(memorial);
    } catch (error) {
      next(error);
    }
  };

  public deleteMemorial = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.memorialService.deleteMemorial(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getMemorialById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.memorialService.getMemorialById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
