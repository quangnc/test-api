import { Controller, Get, Param, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { IsPublic } from 'src/common/decorators';
import { ApiResponse } from 'src/common/api.response';
import { ApkMapper } from 'src/mappers/apk.mapper';
import { UserLanguage } from 'src/common/decorators/user-language.decorator';
import { ListApksQuery } from 'modules/apks/requests/queries';

@Controller({
  path: 'tags',
  version: '1',
})
@IsPublic()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get(':tag')
  async getApksByTag(
    @Param('tag') tag,
    @UserLanguage() language,
    @Query() query: ListApksQuery,
  ) {
    const res = await this.tagsService.getApksByTag(
      decodeURIComponent(tag),
      query.sortBy,
      query.order,
      query.type,
      +query.offset || 0,
      +query.limit || 10,
      language,
    );
    if (res == null) {
      return ApiResponse.unprocessable({
        error: 'tagNotFound',
        message: 'Tag name not found',
      });
    }
    return ApiResponse.success({
      apks: ApkMapper.mapList(res.apks),
      tag: res.tag,
    });
  }
}
