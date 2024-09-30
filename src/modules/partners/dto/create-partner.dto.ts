import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePartnerDto {
  @IsNotEmpty()
  public name_vi: string;

  @IsNotEmpty()
  public name_en: string;

  @IsOptional()
  public description?: string;

  @IsOptional()
  public image?: string;

  @IsOptional()
  public isActive: boolean;
}
