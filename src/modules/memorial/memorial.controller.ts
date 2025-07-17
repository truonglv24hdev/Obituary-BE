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

      const model: MemorialDto = {
        ...req.body,
        require_email: req.body.require_email === "true",
        add_photos: req.body.add_photos === "true",
        deleted:req.body.deleted === "true"
      };
      

      if (req.file) {
        model.picture = `/uploads/${req.file.filename}`;
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

  public updateStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const memorialId = req.params.id;
      const result = await this.memorialService.updateStatus(
        memorialId
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

  public getMemorials = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const memorials = await this.memorialService.getMemorials(req.params.id);
      res.status(200).json(memorials);
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

  public verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { password } = req.body;

      const result = await this.memorialService.verify(id, password);
      switch (result) {
        case 3:
          res.json({ message: "Not found", code: 1 });
          break;
        case 2:
          res.status(200).json({ success: "true", code: 2 });
          break;
      }
    } catch (error) {
      next(error);
    }
  };

  public getAllMemorial = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const memorials = await this.memorialService.getAllMemorial();
      res.status(200).json(memorials);
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.id;
      const { email } = req.body;
      const memorialId = Array.isArray(req.headers["x-memorial-id"])
        ? req.headers["x-memorial-id"][0]
        : req.headers["x-memorial-id"] ?? "";

      const result = await this.memorialService.forgotPassword(
        email,
        memorialId,
        userId
      );
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getMemorialBySearch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { firstName, lastName } = req.query as {
        firstName?: string;
        lastName?: string;
      };

      const memorial = await this.memorialService.getMemorialBySearch(
        firstName || "",
        lastName || ""
      );
      res.status(200).json(memorial);
    } catch (error) {
      next(error);
    }
  };
}
