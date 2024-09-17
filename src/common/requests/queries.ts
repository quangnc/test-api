import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  @IsNumberString()
  offset: string;

  @IsOptional()
  @IsNumberString()
  limit: string;
}
