import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class NewsLocaleDto {
  @IsNotEmpty()
  locale: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  keyword_description: string;

  @IsOptional()
  keywords: string;

  @IsOptional()
  keyword_title: string;
}

export class CreateNewsDto {
  @IsOptional()
  public url: string;

  @IsOptional()
  public count: number;

  @IsOptional()
  public type: number;

  // Cột createdAt với kiểu Date
  @IsOptional()
  created_at: Date;

  // Cột updatedAt (tương tự)
  @IsOptional()
  updated_at: Date;

  @IsBoolean()
  @IsOptional()
  public is_active?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewsLocaleDto)
  locales: NewsLocaleDto[];
}
