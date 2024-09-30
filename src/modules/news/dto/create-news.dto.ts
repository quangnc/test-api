import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
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
  isActive: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewsLocaleDto)
  locales: NewsLocaleDto[];
}
