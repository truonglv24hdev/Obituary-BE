import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import { SignInDto, SignUpDto } from "./auth.dto";
import { TokenData } from "./auth.interface";

export default class AuthController {
  private authService = new AuthService();

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: SignInDto = req.body;
      const tokenData: TokenData = await this.authService.signIn(model);
      res.status(201).json(tokenData);
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: SignUpDto = req.body;
      const tokenData: TokenData = await this.authService.signUp(model);
      res.status(201).json(tokenData);
    } catch (error) {
      next(error);
    }
  };
}
