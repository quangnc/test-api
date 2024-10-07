import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceCategoryDto {
  @IsString()
  @IsNotEmpty()
  public name_vi: string;

  @IsString()
  @IsNotEmpty()
  public name_en: string;

  @IsBoolean()
  @IsOptional()
  public isActive?: boolean;
}
