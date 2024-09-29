import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  @IsNotEmpty()
  public number: string;

  @IsString()
  @IsNotEmpty()
  public organization: string;

  @IsString()
  @IsNotEmpty()
  public standards: string;

  @IsString()
  @IsNotEmpty()
  public scope: string;

  @IsString()
  @IsNotEmpty()
  public start_date: Date;

  @IsString()
  @IsNotEmpty()
  public end_date: Date;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsBoolean()
  @IsOptional()
  public isActive?: boolean;
}
