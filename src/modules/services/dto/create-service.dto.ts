import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class ServiceLocaleDto {
  @IsNotEmpty()
  locale: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  keyword?: string;

  @IsOptional()
  keyword_title?: string;

  @IsOptional()
  keyword_description?: string;
}

export class CreateServiceDto {
  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  url: string;

  @IsBoolean()
  @IsOptional()
  public is_active?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceLocaleDto)
  locales: ServiceLocaleDto[];
}
