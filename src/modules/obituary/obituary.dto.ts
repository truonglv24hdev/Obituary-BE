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
