import UserSchema from "../user/user.model";
import { DataStoreInToken, TokenData } from "./auth.interface";
import { isEmptyObject } from "../../core/utils/helper";
import HttpException from "../../core/middleware/httpException";
import bcrypt from "bcryptjs";
import IUser from "../user/user.interface";
import jwt from "jsonwebtoken";
import { SignUpDto, SignInDto } from "./auth.dto";

class AuthService {
  public userSchema = UserSchema;

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
