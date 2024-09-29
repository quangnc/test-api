import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationQuery {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  limit: number;
}
