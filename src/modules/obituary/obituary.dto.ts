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

export class EventDto {
  @IsNotEmpty()
  @IsString()
  public description!: string;

  @IsNotEmpty()
  @IsString()
  public location!: string;

  @IsNotEmpty()
  @IsString()
  @IsArray()
  public date!: string;

  @IsNotEmpty()
  @IsString()
  @IsArray()
  public time?: string;

  @IsNotEmpty()
  @IsString()
  @IsArray()
  public timeFrom?: string;

  @IsNotEmpty()
  @IsString()
  @IsArray()
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
