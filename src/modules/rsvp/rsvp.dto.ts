import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsDate,
  IsEmail,
  MinLength,
  IsOptional,
  IsString,
  ValidateNested,
  IsBoolean,
} from "class-validator";

export class WakeServiceRSVPDTO {
  @IsNotEmpty()
  @IsBoolean()
  public attending!: boolean;
  
  @IsNotEmpty()
  @IsString()
  public date!: string;

  @IsNotEmpty()
  @IsString()
  public time!: string;
}

export default class RSVPDto {
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
  @IsBoolean()
  public verification: boolean | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  public email: string | undefined;

  @IsNotEmpty()
  @MinLength(10, { message: "Contact is error" })
  public contact: string | undefined;

  @IsOptional()
  @ValidateNested()
  @Type(() => WakeServiceRSVPDTO)
  public WakeServiceRSVPDTO?: WakeServiceRSVPDTO;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  public cortegeDepartureRSVP: boolean | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  public cremationRSVP: boolean | undefined;
}
