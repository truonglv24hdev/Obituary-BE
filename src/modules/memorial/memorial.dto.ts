import {
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsArray,
  IsString,
  IsBoolean,
} from "class-validator";

export default class MemorialDto {
  @IsOptional()
  public picture: string | undefined;

  @IsNotEmpty()
  public first_name: string | undefined;

  @IsNotEmpty()
  public middle_name: string | undefined;

  @IsNotEmpty()
  public last_name: string | undefined;

  @IsNotEmpty()
  public gender: string | undefined;

  @IsNotEmpty()
  public privacy: string | undefined;

  @IsNotEmpty()
  public born: Date | undefined;

  @IsNotEmpty()
  public death: Date | undefined;

  @IsNotEmpty()
  public slug: string | undefined;

  @IsBoolean()
  @IsNotEmpty()
  public premium: boolean | undefined;

  @IsBoolean()
  @IsNotEmpty()
  public setPassword: boolean | undefined;

  @IsOptional()
  @IsString()
  public password: string | undefined;

  @IsBoolean()
  @IsOptional()
  public require_email: boolean | undefined;

  @IsString()
  @IsOptional()
  public moderation: string | undefined;

  @IsBoolean()
  @IsOptional()
  public add_photos: boolean | undefined;
}
