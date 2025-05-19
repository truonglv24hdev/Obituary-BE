import Route from "../../core/interface/routes.interface";
import { Router } from "express";
import AuthController from "./auth.controller";
import validatorMiddleware from "../../core/middleware/validation.middleware";
import { SignInDto, SignUpDto } from "./auth.dto";

export default class AuthRoute implements Route {
  public path = "/api";
  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path + "/sign-up",
      validatorMiddleware(SignUpDto, true),
      this.authController.signUp
    );
    this.router.post(
      this.path + "/sign-in",
      validatorMiddleware(SignInDto, true),
      this.authController.signIn
    );
  }
}
