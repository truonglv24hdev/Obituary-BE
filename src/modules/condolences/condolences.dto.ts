import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CondolencesDto {
  @IsString()
  public full_name: string | undefined;

  @IsNotEmpty()
  @IsString()
  public email: string | undefined;

  @IsNotEmpty()
  public message: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  public photo: string[] | undefined;

  @IsOptional()
  @IsNotEmpty()
  public video: string[] | undefined;
}
