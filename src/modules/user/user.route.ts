import Route from "../../core/interface/routes.interface";
import { Router } from "express";
import UsersController from "./user.controller";
import validatorMiddleware from "../../core/middleware/validation.middleware";
import UserInfoDto from "./user.dto";
import multer from "multer";
import uploadMultiple from "../../core/middleware/uploadCloudinary";

const upload = multer({ storage: multer.memoryStorage() });

export default class UserRoute implements Route {
  public path = "/api/user";
  public router = Router();

  public userController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      this.path + "/:id",
      upload.array("memorials"),
      uploadMultiple,
      validatorMiddleware(UserInfoDto, true),
      this.userController.updateUserById
    );
    this.router.get(this.path, this.userController.getUserPagination);
    this.router.get(this.path + "/:id", this.userController.getUserById);
    this.router.delete(this.path + "/:id", this.userController.deleteUser);
  }
}
