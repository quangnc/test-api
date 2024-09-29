import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
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
}

export class CreateNewsDto {
  @IsNotEmpty()
  public url: string;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewsLocaleDto)
  locales: NewsLocaleDto[];
}
