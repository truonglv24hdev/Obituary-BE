import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsObject,
} from "class-validator";
import { IFamilyTree, ITimeLine } from "./obituary.interface";
import { Type } from "class-transformer";

export class EventDto {
  @IsNotEmpty()
  @IsString()
  public description!: string;

  @IsNotEmpty()
  @IsString()
  public location!: string;

  @IsNotEmpty()
  @IsString()
  public date!: string;

  @IsNotEmpty()
  @IsString()
  public time?: string;

  @IsNotEmpty()
  @IsString()
  public timeFrom?: string;

  @IsNotEmpty()
  @IsString()
  public timeTo?: string;
}

export default class ObituaryDto {
  @IsOptional()
  public headerImage: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public quote: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public wordsFromFamily: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public lifeStory: string | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  public familyTree: IFamilyTree | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  public favorites: string[] | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  public timeline: ITimeLine[] | undefined;

  @IsOptional()
  @ValidateNested()
  @Type(() => EventDto)
  public wakeDetails?: EventDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EventDto)
  public cortegeDeparture?: EventDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EventDto)
  public cremation?: EventDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public gallery?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public video?: string[];
}
