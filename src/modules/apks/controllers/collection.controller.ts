import { Controller, Get, Query } from '@nestjs/common';
import { GetCollectionQuery } from 'modules/apks/requests/queries';
import { IsPublic } from 'src/common/decorators';
import { UserLanguage } from 'src/common/decorators/user-language.decorator';
import { ApkMapper } from 'src/mappers/apk.mapper';
import { ApkListType } from 'modules/apks/entities/apk-list.entity';
import { ApiResponse } from 'src/common/api.response';
import { ApksService } from 'modules/apks/services/apks.service';
import { ArticlesService } from 'modules/articles/articles.service';
import { ArticleMapper } from 'src/mappers/article.mapper';

@Controller({
  path: 'collections',
  version: '1',
})
@IsPublic()
export class CollectionController {
  constructor(readonly apksService: ApksService, private articleService: ArticlesService) {}

  @Get('editor-choice')
  async getEditorChoiceList(@UserLanguage() language: string, @Query() query: GetCollectionQuery) {
    const list = await this.apksService.getApkList(
      +query.offset || 0,
      +query.limit || 10,
      ApkListType.editorChoice,
      language,
    );

    return ApiResponse.success({
      apks: ApkMapper.mapList(list.map((l) => l.apk)),
    });
  }

  @Get('discover')
  async getDiscoverList(@UserLanguage() language: string, @Query() query: GetCollectionQuery) {
    const list = await this.apksService.getApkList(
      +query.offset || 0,
      +query.limit || 10,
      ApkListType.discover,
      language,
    );
    const article = await this.articleService.getByIdSlug('discover');

    return ApiResponse.success({
      apks: ApkMapper.mapList(list?.map((l) => l.apk)),
      article: article ? ArticleMapper.mapDetail(article) : {},
    });
  }
}
