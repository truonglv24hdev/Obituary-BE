import Route from "../../core/interface/routes.interface";
import { Router } from "express";
import AuthController from "./auth.controller";
import { changePassword, sendLink, sendOtp, signIn,signUp } from "../../core/validators/auth.validator";

export default class AuthRoute implements Route {
  public path = "/api";
  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * '/api/sign-up':
     *  post:
     *     tags:
     *     - Auth
     *     summary: Sign-up account
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            properties:
     *              first_name:
     *                type: string
     *              email:
     *                type: string
     *              password:
     *                type: string
     *     responses:
     *       201:
     *         description: Create success
     *       400:
     *         description: Bad request
     */
    this.router.post(
      this.path + "/sign-up",
      signUp,
      this.authController.signUp
    );

    /**
     * @openapi
     * '/api/sign-in':
     *  post:
     *     tags:
     *     - Auth
     *     summary: Sign-in account
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            properties:
     *              email:
     *                type: string
     *              password:
     *                type: string
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Bad request
     */
    this.router.post(
      this.path + "/sign-in",
      signIn,
      this.authController.signIn
    );

    this.router.post(
      this.path + "/send-link",
      sendLink,
      this.authController.sendLink
    );

    this.router.post(
      this.path + "/otp/:email",
      sendOtp,
      this.authController.otp
    );

    this.router.post(
      this.path + "/reset-password/:email",
      changePassword,
      this.authController.resetPassword
    );
  }
}
