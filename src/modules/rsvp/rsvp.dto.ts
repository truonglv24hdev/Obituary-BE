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

export class ServiceRSVPDTO {
  @IsNotEmpty()
  @IsBoolean()
  public attending?: string;
  
  @IsNotEmpty()
  @IsString()
  public date?: string;

  @IsNotEmpty()
  @IsString()
  public time?: string;
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
  @Type(() => ServiceRSVPDTO)
  public wakeService?: ServiceRSVPDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => ServiceRSVPDTO)
  public cortegeDeparture?: ServiceRSVPDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => ServiceRSVPDTO)
  public cremation?: ServiceRSVPDTO;
}
