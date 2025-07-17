import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";
import UserInfoDto from "./user.dto";

export default class UsersController {
  private userService = new UserService();

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user.id;
    try {
      const user = await this.userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public updateUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: UserInfoDto = {
        ...req.body,
        deleted: req.body.deleted === "true",
      };
      model.memorials = (req.files as Express.Multer.File[])?.map(
        (file) => `/uploads/${file.filename}`
      );
      const user = await this.userService.updateUserById(req.user.id, model);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: UserInfoDto = req.body
      const user = await this.userService.updateUser(req.params.id, model);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public updateUserByAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const user = await this.userService.updateUserByAdmin(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public getUserPagination = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const keyword = req.query.keyword as string;
      const page: number = Number(req.query.page) || 1;
      const user = await this.userService.getAllPaging(keyword, page);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.userService.deleteUser(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
