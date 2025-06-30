import UserSchema from "../user/user.model";
import { DataStoreInToken, TokenData } from "./auth.interface";
import { isEmptyObject } from "../../core/utils/helper";
import HttpException from "../../core/middleware/httpException";
import bcrypt from "bcryptjs";
import IUser from "../user/user.interface";
import jwt from "jsonwebtoken";
import { SignUpDto, SignInDto } from "./auth.dto";
import forgotPasswordModel from "./forgotPassword.model";
import { sendMail } from "../../core/utils/sendMailer";

class AuthService {
  public userSchema = UserSchema;
  public forgotPasswordSchema = forgotPasswordModel;

  public async signIn(model: SignInDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const user = await this.userSchema.findOne({ email: model.email });
    if (!user) {
      throw new HttpException(400, "Your email is not exist");
    }

    const checkPassword = await bcrypt.compare(model.password!, user.password);
    if (!checkPassword) {
      throw new HttpException(400, "Incorrect password");
    }

    return this.createToken(user);
  }

  public async signUp(model: SignUpDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const user = await this.userSchema.findOne({ email: model.email });
    if (user) {
      throw new HttpException(400, "Your email already exist");
    }

    const slat = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(model.password!, slat);

    const newUser: IUser = await this.userSchema.create({
      ...model,
      password: hashedPassword,
    });

    return this.createToken(newUser);
  }

  public async sendLink(email: string) {
    const findEmail = await this.userSchema.findOne({ email: email });
    if (!findEmail) {
      return 1;
    }
    const generateRandomNumber = (length: number) => {
      const characters = "0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    const otp = generateRandomNumber(6);
    const objectForgotPassword = {
      email: email,
      otp: otp,
      expireAt: Date.now(),
    };

    const forgotPassword = await this.forgotPasswordSchema.create(
      objectForgotPassword
    );

    if (findEmail && forgotPassword) {
      const subject = "Rest Password";
      const html = `Otp rest password là <b>${otp}</b>, Expire <b>1 hour</b>. `;

      sendMail(email, subject, html);

      return 2;
    } else {
      return "Email not find";
    }
  }

  public async otp(otp: string, email: string) {
    const result = await this.forgotPasswordSchema.findOne({
      email: email,
      otp: otp,
    });
    if (!result) {
      return 1;
    }

    return 2;
  }

  public async resetPassword(
    password: string,
    confirmPassword: string,
    email: string
  ) {
    if (password !== confirmPassword) {
      return 1;
    }

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = await this.userSchema.findOneAndUpdate(
        {
          email: email,
        },
        { password: hashedPassword }
      );
      if (!user) {
        return 2;
      }
    }

    return 3;
  }

  private createToken(user: IUser): TokenData {
    const dataInToken: DataStoreInToken = { id: user._id, role: user.role };
    const secret: string = process.env.JWT_TOKEN_SECRET! || "secret";
    const expiresIn: number = 3600;
    return {
      token: jwt.sign(dataInToken, secret, { expiresIn }),
    };
  }
}

export default AuthService;
