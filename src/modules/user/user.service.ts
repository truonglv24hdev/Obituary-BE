import UserSchema from "./user.model";
import UserInfoDto from "./user.dto";
import { isEmptyObject } from "../../core/utils/helper";
import HttpException from "../../core/middleware/httpException";
import bcrypt from "bcryptjs";
import IUser from "./user.interface";
import IPagination from "../../core/interface/pagination.interface";

class UserService {
  public userSchema = UserSchema;

  public async updateUserById(
    userId: string,
    model: UserInfoDto
  ): Promise<IUser> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const user = await this.userSchema.findById(userId);
    if (!user) {
      throw new HttpException(400, "User id not exist");
    }

    let updateUserById;

    if (model.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(model.password, salt);
      updateUserById = await this.userSchema.findByIdAndUpdate(
        userId,
        {
          ...model,
          code: model.code?.toLocaleUpperCase(),
          password: hashedPassword,
        },
        { new: true }
      );
    } else {
      updateUserById = await this.userSchema.findByIdAndUpdate(
        userId,
        {
          ...model,
          code: model.code?.toLocaleUpperCase(),
        },
        { new: true }
      );
    }

    if (!updateUserById) throw new HttpException(404, "Update fail");

    return updateUserById;
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await this.userSchema.findById(userId);
    if (!user) {
      throw new HttpException(409, "User is not exist");
    }

    return user;
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this.userSchema.find();

    return users;
  }

  public async getAllPaging(
    keyword: string,
    page: number
  ): Promise<IPagination<IUser>> {
    const pageSize = Number(process.env.PAGE_SIZE || 10);

    let query;
    if (keyword) {
      query = this.userSchema
        .find({
          $or: [
            { email: { $regex: keyword, $options: "i" } },
            { first_name: { $regex: keyword, $options: "i" } },
            { last_name: { $regex: keyword, $options: "i" } },
          ],
        })
        .sort({ date: -1 });
    } else {
      query = this.userSchema.find().sort({ date: -1 });
    }

    const users = await this.userSchema
      .find(query)
      .sort({ date: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const countUser = await query.countDocuments();

    return {
      total: countUser,
      page: page,
      pageSize: pageSize,
      items: users,
    } as IPagination<IUser>;
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const result = await this.userSchema.findByIdAndDelete(userId);
    if (!result) {
      throw new HttpException(404, "User not found");
    }
    return result;
  }
}

export default UserService;
