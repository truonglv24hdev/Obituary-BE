import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsObject,
} from "class-validator";
import { IEvent, IFamilyTree, ITimeLine } from "./obituary.interface";
import { Type } from "class-transformer";

class ScheduleDto {
  @IsString()
  date!: string;

  @IsString()
  timeFrom!: string;

  @IsString()
  timeTo!: string;
}

export class EventDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  eventTitle!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedule!: ScheduleDto[];
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
  public favorites: [] | undefined;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  public timeLine: ITimeLine[] | undefined;

  @IsOptional()
  @IsArray()
  public event: IEvent[] | undefined;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public gallery?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public video?: string[];
}
