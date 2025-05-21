import { Type } from "class-transformer";
import { IsNotEmpty, IsDate, IsEmail, MinLength } from "class-validator";

export default class RSVPDto {
  @IsNotEmpty()
  public location: string | undefined;

  @IsDate()
  @Type(() => Date)
  public date: Date | undefined;

  @IsNotEmpty()
  public time: string | undefined;

  @IsNotEmpty()
  public first_name: string | undefined;

  @IsNotEmpty()
  public last_name: string | undefined;

  @IsNotEmpty()
  public verification: boolean | undefined;

  @IsNotEmpty()
  @IsEmail()
  public email: string | undefined;

  @IsNotEmpty()
  @MinLength(10, { message: "Contact is error" })
  public contact: string | undefined;
}
