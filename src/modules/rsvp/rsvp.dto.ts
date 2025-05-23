import { Type } from "class-transformer";
import { IsNotEmpty, IsDate, IsEmail, MinLength, IsOptional } from "class-validator";

export default class RSVPDto {
  @IsOptional()
  @IsNotEmpty()
  public location: string | undefined;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  public date: Date | undefined;

  @IsOptional()
  @IsNotEmpty()
  public time: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  public first_name: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  public last_name: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  public verification: boolean | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  public email: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(10, { message: "Contact is error" })
  public contact: string | undefined;
}
