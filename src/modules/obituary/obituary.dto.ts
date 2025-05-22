import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  ValidateNested,
  IsObject,
} from "class-validator";
import { IFamilyTree, ITimeLine } from "./obituary.interface";

export default class ObituaryDto {
  @IsNotEmpty()
  @IsString()
  public quote: string | undefined;

  @IsNotEmpty()
  @IsString()
  public wordsFromFamily: string | undefined;

  @IsNotEmpty()
  @IsString()
  public lifeStory: string | undefined;

  @IsNotEmpty()
  @IsObject()
  public familyTree: IFamilyTree | undefined;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  public favorites: string[] | undefined;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  public timeline: ITimeLine[] | undefined;

  @IsNotEmpty()
  public quoteEvent: string | undefined;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public gallery?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public video?: string[];
}
