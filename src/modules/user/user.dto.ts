import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
  IsArray,
  IsString
} from "class-validator";

export default class UserInfoDto {
  @IsNotEmpty()
  public first_name: string | undefined;

  @IsNotEmpty()
  @IsOptional()
  public last_name: string | undefined;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  public email: string | undefined;

  @IsNotEmpty()
  @IsOptional()
  @MinLength(6, { message: "Password is too short" })
  public password: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6, { message: "Code is too short" })
  public code: string | undefined;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) 
  public memorials: string[] | undefined;

  @IsOptional()
  @IsNotEmpty()
  public address: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  public country: string | undefined;
}
