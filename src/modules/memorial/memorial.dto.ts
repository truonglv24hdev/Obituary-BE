import {
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsArray,
  IsString,
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
  @IsDate()  
  public born: Date | undefined;

  @IsNotEmpty()
  @IsDate()
  public death: Date | undefined;
}
