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

  public sendLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await this.authService.sendLink(email);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public resendLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;
      const result = await this.authService.sendLink(email);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public otp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { otp } = req.body;
      const { email } = req.params;
      const result = await this.authService.otp(otp, email);

      switch (result) {
        case 1:
          res.status(404).json({ message: "Otp not correct.", code: 1 });
          break;
        case 2:
          res.status(201).json({ message: "Otp correct.", code: 2 });
          break;
        default:
          res.status(400).json({ message: "Invalid result.", code: 0 });
          break;
      }
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password, confirmPassword } = req.body;
      const { email } = req.params;
      const result = await this.authService.resetPassword(
        password,
        confirmPassword,
        email
      );

      switch (result) {
        case 1:
          res.status(404).json({ message: "Password not correct.", code: 1 });
          break;
        case 2:
          res.status(404).json({ message: "Password not change.", code: 2 });
          break;
        case 3:
          res.status(201).json({ message: "Password change success.", code: 3 });
          break;
        default:
          res.status(400).json({ message: "Invalid result.", code: 0 });
          break;
      }
    } catch (error) {
      next(error);
    }
  };
}
