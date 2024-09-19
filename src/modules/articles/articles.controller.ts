import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListArticleParam } from 'modules/articles/requests/params';
import { ArticlesService } from 'modules/articles/articles.service';
import {
  DetailArticleQuery,
  ListArticlesQuery,
} from 'modules/articles/requests/queries';
import { strToArray } from 'src/utils/array';
import { ApiResponse } from 'src/common/api.response';
import { UserLanguage } from 'src/common/decorators/user-language.decorator';
import { IsPublic } from 'src/common/decorators';
import { ArticleMapper } from 'src/mappers/article.mapper';

@Controller({
  path: 'articles',
  version: '1',
})
@IsPublic()
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get('detail')
  async getDetail(
    @Query() query: DetailArticleQuery,
    @UserLanguage() language,
  ) {
    const { article } = await this.articleService.getDetail(
      +query.id || query.slug,
      +query.offset || 0,
      +query.limit || 10,
      language || 'en',
    );
    return ApiResponse.success({
      article: ArticleMapper.mapDetail(article),
    });
  }

  @Get(':type')
  async getList(
    @Param() param: ListArticleParam,
    @Query() query: ListArticlesQuery,
    @UserLanguage() language: string,
  ) {
    const { type } = param;
    const list = strToArray(query.list);
    const validLists = ['populars', 'newest'];

    if (!type) {
      return ApiResponse.badRequest({
        error: 'badRequest',
        message: 'Api missing param type',
      });
    }

    if (list.some((l) => !validLists.includes(l.trim()))) {
      return ApiResponse.badRequest({
        error: 'badRequest',
        message: `List must be in ${validLists.join(',')}`,
      });
    }

    const results = await this.articleService.getList(
      list,
      type,
      +query.offset || 0,
      +query.limit || 10,
      language,
    );
    return ApiResponse.success({
      populars: ArticleMapper.mapList(results.populars),
      newest: ArticleMapper.mapList(results.newest),
    });
  }
}
