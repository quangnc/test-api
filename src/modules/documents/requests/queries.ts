import { IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  public url: string;
}
