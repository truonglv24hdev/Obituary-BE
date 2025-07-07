import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CondolencesDto {
  @IsString()
  @IsNotEmpty()
  public full_name: string | undefined;

  @IsOptional()
  public email: string | undefined;

  @IsOptional()
  public message: string | undefined;

  @IsOptional()
  public photo: string | undefined;

  @IsOptional()
  public video: string | undefined;
}
