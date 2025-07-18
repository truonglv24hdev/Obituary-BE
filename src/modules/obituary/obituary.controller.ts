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

  public postUpload = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const imageUrl = `/uploads/${req.file?.filename}`;
      res.status(200).json({ url: imageUrl });
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
      const userIdOrNull = req.user.role === "ADMIN" ? null : req.user.id;

      let galleryOld: string[] = [];
      if (req.body.galleryOld) {
        try {
          galleryOld = JSON.parse(req.body.galleryOld);
        } catch (e) {
          galleryOld = [];
        }
      }

      if (req.files) {
        const files = req.files as {
          gallery?: Express.Multer.File[];
          video?: Express.Multer.File[];
          headerImage?: Express.Multer.File[];
        };

        const galleryNew = (files.gallery ?? []).map(
          (file) => `/uploads/${file.filename}`
        );

        const gallery = [...galleryOld, ...galleryNew];
        const model: ObituaryDto = {
          ...req.body,
          gallery,
          video: (files.video ?? []).map((file) => `/uploads/${file.filename}`),
          headerImage: files.headerImage?.[0]
            ? `/uploads/${files.headerImage[0].filename}`
            : undefined,
          familyTree: req.body.familyTree
            ? JSON.parse(req.body.familyTree)
            : [],
          favorites: req.body.favorites ? JSON.parse(req.body.favorites) : [],
          timeLine: req.body.timeLine ? JSON.parse(req.body.timeLine) : [],
          event: req.body.event ? JSON.parse(req.body.event) : [],
        };

        const obituary = await this.ObituaryService.updateObituaryById(
          req.params.id,
          userIdOrNull,
          model
        );
        res.status(200).json(obituary);
      } else {
        let galleryOld: string[] = [];
        if (req.body.galleryOld) {
          try {
            galleryOld = JSON.parse(req.body.galleryOld);
          } catch (e) {
            galleryOld = [];
          }
        }
        const model: ObituaryDto = {
          ...req.body,
          gallery: galleryOld,
          familyTree: req.body.familyTree
            ? JSON.parse(req.body.familyTree)
            : [],
          favorites: req.body.favorites ? JSON.parse(req.body.favorites) : [],
          timeLine: req.body.timeLine ? JSON.parse(req.body.timeLine) : [],
          event: req.body.event ? JSON.parse(req.body.event) : [],
        };
        const obituary = await this.ObituaryService.updateObituaryById(
          req.params.id,
          userIdOrNull,
          model
        );
        res.status(200).json(obituary);
      }
    } catch (error) {
      next(error);
    }
  };

  public getObituaryByMemorialId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const userId = req.user.id;
      const obituary = await this.ObituaryService.getObituaryByMemorialId(
        req.params.id,
        // userId
      );
      res.status(200).json(obituary);
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
      const obituary = await this.ObituaryService.getObituaryById(
        req.params.id
      );
      res.status(200).json(obituary);
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
