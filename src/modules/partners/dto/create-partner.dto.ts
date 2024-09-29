import { IsNotEmpty, IsOptional, IsUrl, IsBoolean } from 'class-validator';

export class CreatePartnerDto {
  @IsNotEmpty()
  public name_vi: string;

  @IsNotEmpty()
  public name_en: string;

  @IsOptional()
  public description?: string;

  @IsUrl()
  public url: string;

  @IsOptional()
  public image?: string;

  @IsBoolean()
  public isActive: boolean;
}
