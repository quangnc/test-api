import { IsIn, IsNotEmpty } from 'class-validator';
import { ArticleTypes } from 'modules/articles/entities/article.entity';
import { enumValues } from 'src/utils/array';

export class ListArticleParam {
  @IsNotEmpty()
  @IsIn(enumValues(ArticleTypes))
  type: string;
}
