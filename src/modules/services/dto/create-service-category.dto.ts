import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceCategoryDto {
  @IsString()
  @IsNotEmpty()
  public name_vi: string;

  @IsString()
  @IsNotEmpty()
  public name_en: string;

  @IsNumber()
  public isActive: number;
}
