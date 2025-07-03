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
      const userId = req.user.id;
      const model: MemorialDto = req.body;
      model.picture = `/uploads/${req.file?.filename}`;
      const memorial = await this.memorialService.createMemorial(userId, model);
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
      const userId = req.user.id;
      const model: MemorialDto = req.body;
      if (req.file) {
        model.picture = `/uploads/${req.file?.filename}`;
      }
      const memorial = await this.memorialService.updateMemorial(
        req.params.id,
        userId,
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
      const userId = req.user.id;
      const result = await this.memorialService.deleteMemorial(
        req.params.id,
        userId
      );
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

  public getMemorialByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.id;

      // lấy page & limit từ query
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 4;
      const skip = (page - 1) * limit;

      const memorials = await this.memorialService.getMemorialByUser(
        userId,
        skip,
        limit
      );
      const total = await this.memorialService.countMemorialByUser(userId);

      res.status(200).json({
        data: memorials,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      next(error);
    }
  };
}
