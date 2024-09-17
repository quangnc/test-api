import { PaginationQuery } from 'src/common/requests/queries';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class ListArticlesQuery extends PaginationQuery {
  @IsNotEmpty()
  @IsString()
  list: string;
}

export class DetailArticleQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsNumberString()
  id: string;
}
