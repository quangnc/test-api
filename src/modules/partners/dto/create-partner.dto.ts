import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePartnerDto {
  @IsNotEmpty()
  public name_vi: string;

  @IsNotEmpty()
  public name_en: string;

  @IsOptional()
  public description?: string;

  @IsOptional()
  public url?: string;

  @IsBoolean()
  @IsOptional()
  public is_active?: boolean;
}
