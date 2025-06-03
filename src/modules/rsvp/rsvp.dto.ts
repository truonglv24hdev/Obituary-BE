import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsDate,
  IsEmail,
  MinLength,
  IsOptional,
  IsString,
} from "class-validator";

export default class RSVPDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Location must not be empty if provided" })
  public location?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Date must not be empty if provided" })
  public date: Date | undefined;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Time must not be empty if provided" })
  public time: string | undefined;

  @IsNotEmpty()
  public first_name: string | undefined;

  @IsNotEmpty()
  public last_name: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  public verification: boolean | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  public email: string | undefined;

  @IsNotEmpty()
  @MinLength(10, { message: "Contact is error" })
  public contact: string | undefined;
}
